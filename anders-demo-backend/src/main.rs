#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
#[macro_use]
extern crate serde_derive;

use rocket_cors;

use std::sync::Mutex;

use rocket::http::Method;
use rocket::State;
use rocket_contrib::json::{Json, JsonValue};
use rocket_cors::{AllowedHeaders, AllowedOrigins, Error};

type ScoreDB = Mutex<Vec<Score>>;

#[get("/", format = "json")]
fn get_scores(scoreDB: State<'_, ScoreDB>) -> Json<Vec<Score>> {
    let mut scores = scoreDB.lock().unwrap();
    Json(scores.to_vec())
}

#[derive(Serialize, Deserialize, Clone)]
struct Score {
    name: String,
    score: String,
}

#[post("/", format = "json", data = "<score>")]
fn add_score(score: Json<Score>, scoreDB: State<'_, ScoreDB>) -> JsonValue {
    let mut scores = scoreDB.lock().unwrap();
    scores.push(score.0);
    json!({
        "status": "Ok"
    })
}

fn main() -> Result<(), Error> {
    let allowed_origins = AllowedOrigins::some_exact(&["http://localhost:3001/"]);

    let cors = rocket_cors::CorsOptions {
        allowed_origins,
        allowed_methods: vec![Method::Get, Method::Post].into_iter().map(From::from).collect(),
        allowed_headers: AllowedHeaders::some(&["Accept", "content-type"]),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()?;

    rocket::ignite()
        .mount("/", routes![get_scores, add_score])
        .manage(Mutex::new(Vec::<Score>::new()))
        .attach(cors)
        .launch();

    Ok(())
}

import { Router } from "express";

const router = Router();

let cardList =
	[
		'Roy Campanella',
		'Paul Molitor',
		'Tony Gwynn',
		'Dennis Eckersley',
		'Reggie Jackson',
		'Gaylord Perry',
		'Buck Leonard',
		'Rollie Fingers',
		'Charlie Gehringer',
		'Wade Boggs',
		'Carl Hubbell',
		'Dave Winfield',
		'Jackie Robinson',
		'Ken Griffey, Jr.',
		'Al Simmons',
		'Chuck Klein',
		'Mel Ott',
		'Mark McGwire',
		'Nolan Ryan',
		'Ralph Kiner',
		'Yogi Berra',
		'Goose Goslin',
		'Greg Maddux',
		'Frankie Frisch',
		'Ernie Banks',
		'Ozzie Smith',
		'Hank Greenberg',
		'Kirby Puckett',
		'Bob Feller',
		'Dizzy Dean',
		'Joe Jackson',
		'Sam Crawford',
		'Barry Bonds',
		'Duke Snider',
		'George Sisler',
		'Ed Walsh',
		'Tom Seaver',
		'Willie Stargell',
		'Bob Gibson',
		'Brooks Robinson',
		'Steve Carlton',
		'Joe Medwick',
		'Nap Lajoie',
		'Cal Ripken, Jr.',
		'Mike Schmidt',
		'Eddie Murray',
		'Tris Speaker',
		'Al Kaline',
		'Sandy Koufax',
		'Willie Keeler',
		'Pete Rose',
		'Robin Roberts',
		'Eddie Collins',
		'Lefty Gomez',
		'Lefty Grove',
		'Carl Yastrzemski',
		'Frank Robinson',
		'Juan Marichal',
		'Warren Spahn',
		'Pie Traynor',
		'Roberto Clemente',
		'Harmon Killebrew',
		'Satchel Paige',
		'Eddie Plank',
		'Josh Gibson',
		'Oscar Charleston',
		'Mickey Mantle',
		'Cool Papa Bell',
		'Johnny Bench',
		'Mickey Cochrane',
		'Jimmie Foxx',
		'Jim Palmer',
		'Cy Young',
		'Eddie Mathews',
		'Honus Wagner',
		'Paul Waner',
		'Grover Alexander',
		'Rod Carew',
		'Joe DiMaggio',
		'Joe Morgan',
		'Stan Musial',
		'Bill Terry',
		'Rogers Hornsby',
		'Lou Brock',
		'Ted Williams',
		'Bill Dickey',
		'Christy Mathewson',
		'Willie McCovey',
		'Lou Gehrig',
		'George Brett',
		'Hank Aaron',
		'Harry Heilmann',
		'Walter Johnson',
		'Roger Clemens',
		'Ty Cobb',
		'Whitey Ford',
		'Willie Mays',
		'Rickey Henderson',
		'Babe Ruth'
	];

router.post("/login", (req, res) => {
	const { username } = req.body;
	// TEMP FOR LOCAL TESTING.

	if (username == "alex") {
		res.status(200).json({ id: 12, error: "" });
	} else {
		res.status(400).json({ error: "Invalid user" });
	}
});

router.post("/add", (req, res) => {
	const { name } = req.body;
	// TEMP FOR LOCAL TESTING.

	cardList.push(name);

	res.status(200);
});

router.get("/search", (req, res) => {
	console.log("Search running")
	const { name } = req.query;
	// TEMP FOR LOCAL TESTING.

	if (name == null || name == undefined) return;

	const regex = new RegExp(name as string, "i");

	let newList = cardList.filter(item => item.match(regex));
	res.json({
		cards: newList
	});
});

export default router;
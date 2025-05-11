from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

app.mount("/frontend", StaticFiles(directory=FRONTEND_DIR), name="frontend")

CANDIES = [
	{"id": 0, "name": "Caramel0", "weight": 100, "image": "https://www.espace-bonbon.fr/4231-large_default/bonbons-luciole-100g.webp"},
	{"id": 1, "name": "Caramel1", "weight": 100, "image": "https://www.espace-bonbon.fr/4231-large_default/bonbons-luciole-100g.webp"},
	{"id": 2, "name": "Caramel2", "weight": 100, "image": "https://www.espace-bonbon.fr/4231-large_default/bonbons-luciole-100g.webp"},
	{"id": 3, "name": "Caramel3", "weight": 100, "image": "https://www.espace-bonbon.fr/4231-large_default/bonbons-luciole-100g.webp"},
	{"id": 4, "name": "Caramel4", "weight": 100, "image": "https://www.espace-bonbon.fr/4231-large_default/bonbons-luciole-100g.webp"},
	{"id": 5, "name": "Caramel5", "weight": 100, "image": "https://www.espace-bonbon.fr/4231-large_default/bonbons-luciole-100g.webp"},
	{"id": 6, "name": "Caramel6", "weight": 250, "image": "https://www.espace-bonbon.fr/4231-large_default/bonbons-luciole-100g.webp"},
	{"id": 7, "name": "Caramel7", "weight": 500, "image": "https://www.espace-bonbon.fr/4231-large_default/bonbons-luciole-100g.webp"},
	{"id": 8, "name": "Caramel8", "weight": 750, "image": "https://www.espace-bonbon.fr/4231-large_default/bonbons-luciole-100g.webp"},
	{"id": 9, "name": "Caramel9", "weight": 1000, "image": "https://www.espace-bonbon.fr/4231-large_default/bonbons-luciole-100g.webp"},
]

IMAGES = [
	"https://www.espace-bonbon.fr/4231-large_default/bonbons-luciole-100g.webp",
	"https://www.japanfm.fr/wp-content/uploads/2022/10/chainsaw-man-pochita-et-denji.jpg",
	"https://www.espace-bonbon.fr/4231-large_default/bonbons-luciole-100g.webp",
	"https://www.japanfm.fr/wp-content/uploads/2022/10/chainsaw-man-pochita-et-denji.jpg",
]

@app.get("/candies")
async def get_candies():
	return CANDIES

@app.get("/carousel")
async def get_carousel():
	return IMAGES

@app.get("/")
async def root():
	return FileResponse(os.path.join(FRONTEND_DIR, "index.html"), media_type="text/html")

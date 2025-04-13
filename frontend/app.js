const	{ useState, useEffect, useRef } = React;

function CandyApp() {
	const	[candies, setCandies] = useState([]);
	const	[carouselImages, setCarouselImages] = useState([]);

	const	CandySelector = ({ candies, MAX_WEIGHT = 3500, MIN_QUANTITY = 15 }) => {
		const	[selected, setSelected] = useState({});
	
		const	totalWeight = Object.entries(selected).reduce((sum, [id, qty]) => {
			const	candy = candies.find(c => c.id === Number(id));
			return sum + (candy ? candy.weight * qty : 0);
		}, 0);
	
		const	totalQuantity = Object.values(selected).reduce((sum, qty) => sum + qty, 0);
	
		const	increase = (candyId) => {
			const	candy = candies.find(c => c.id === Number(candyId));
			if (!candy) return;
	
			const	newWeight = totalWeight + candy.weight;
			if (newWeight > MAX_WEIGHT) return;
	
			setSelected((prev) => ({
				...prev,
				[candyId]: (prev[candyId] || 0) + 1,
			}));
		};
	
		const	decrease = (candyId) => {
			setSelected((prev) => {
				const	current = prev[candyId] || 0;
				if (current <= 0) return prev;
	
				return {
					...prev,
					[candyId]: current - 1,
				};
			});
		};
	
		return (
			<div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-fit">
				<h2 className="text-xl font-bold mb-2 text-center">
					Candy Bucket 🍭- Seau de Bonbons Vrac (3,5kg) <br />
					69,99 €
				</h2>
	
				<p className="text-center text-sm text-gray-600 mb-4">
					Poids total : {(totalWeight / 1000).toFixed(2)} kg / 3.5 kg
				</p>
	
				<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 flex-grow">
					{candies.map((candy) => {
						const	quantity = selected[candy.id] || 0;
						const	newWeight = totalWeight + candy.weight;
						const	willExceed = newWeight > MAX_WEIGHT;

						return (
							<div
								key={candy.id}
								className={`relative flex flex-col items-center rounded-2xl p-2 border transition duration-200 shadow-sm ${
									quantity > 0 ? "border-pink-400 bg-pink-50" : "border-gray-200 bg-white"
								}`}
								style={{
									width: "100%",
									height: "fit-content",
								}}
							>
								{/* Nom + poids unitaire */}
								<div className="flex flex-col items-center justify-center text-sm font-semibold leading-tight mb-1 text-center">
									<span>{candy.name}</span>
									<span className="text-[0.65rem] text-gray-500 font-normal">{candy.weight} g</span>
								</div>
						
								{/* Image + boutons overlay */}
								<div className="relative w-full aspect-square rounded-xl overflow-hidden shadow">
									<img
										src={candy.image}
										alt={candy.name}
										className="w-full h-full object-cover"
									/>
						
									{/* Overlay des boutons */}
									<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs shadow">
										<button
											className="text-black font-bold"
											onClick={() => decrease(candy.id)}
											disabled={quantity <= 0}
										>
											−
										</button>
										<span className="w-4 text-center">{quantity}</span>
										<button
											className="text-black font-bold"
											onClick={() => increase(candy.id)}
											disabled={willExceed}
										>
											+
										</button>
									</div>
								</div>
						
								{/* Poids total sélectionné */}
								{quantity > 0 && (
									<p className="text-[0.65rem] text-gray-600 mt-1">
										{candy.weight * quantity} g sélectionnés
									</p>
								)}
							</div>
						);
										
					})}

				</div>

				<div className="mt-4 flex items-center justify-between">
				<button
					type="submit"
					name="add"
					data-add-to-cart-text="Ajouter au panier"
					className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-xl transition disabled:opacity-50 flex-1"
					onClick={() => {
						setSelected({});
						alert(`Ajouté ${totalQuantity} bonbon(s) (${(totalWeight / 1000).toFixed(2)} kg) au panier !`);
					}}
					disabled={
						!(
							(totalWeight >= MAX_WEIGHT - 100 && totalWeight <= MAX_WEIGHT) ||
							totalQuantity >= MIN_QUANTITY
						)
					}
				>
					Ajouter {totalQuantity} bonbon{totalQuantity > 1 ? "s" : ""} au panier ({(totalWeight / 1000).toFixed(2)} kg)
				</button>


					{totalWeight > 0 && (
						<button
							className="ml-3 p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition"
							onClick={() => setSelected({})}
							title="Réinitialiser la sélection"
						>
							↻
						</button>
					)}
				</div>
			</div>
		);
	};

	const	Carousel = ({ images = [] }) => {
		const [activeImage, setActiveImage] = useState(0);
	
		const goToPrevious = () => {
			setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
		};
	
		const goToNext = () => {
			setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
		};
	
		return (
			<div
				id="carousel-container"
				className="bg-white rounded-lg p-4 w-full max-w-4xl mx-auto"
			>
				{images.length > 0 && (
					<>
						{/* Image principale */}
						<div className="relative w-full h-[500px] bg-white border rounded-md overflow-hidden shadow-md mb-4">
							<img
								src={images[activeImage]}
								alt={images[activeImage]}
								className="w-full h-full object-contain"
							/>
							{/* Flèche gauche */}
							<button
								onClick={goToPrevious}
								className="pb-1 absolute top-1/2 left-3 -translate-y-1/2 w-12 h-12 bg-white text-pink-500 text-2xl rounded-full shadow-md flex items-center justify-center leading-none transition hover:bg-pink-500 hover:text-white"
								title="Précédent"
							>
								←
							</button>
							{/* Flèche droite */}
							<button
								onClick={goToNext}
								className="pb-1 absolute top-1/2 right-3 -translate-y-1/2 w-12 h-12 bg-white text-pink-500 text-2xl rounded-full shadow-md flex items-center justify-center leading-none transition hover:bg-pink-500 hover:text-white"
								title="Suivant"
							>
								→
							</button>
						</div>
	
						{/* Miniatures rectangulaires */}
						<div className="flex justify-center gap-3 overflow-x-auto pb-2">
							{images.map((url, idx) => (
								<img
									key={`${url}-${idx}`}
									src={url}
									onClick={() => setActiveImage(idx)}
									className={`w-24 h-24 object-cover cursor-pointer border-2 rounded-md transition duration-200 ${
										activeImage === idx ? "border-pink-500" : "border-gray-300"
									}`}
								/>
							))}
						</div>
					</>
				)}
			</div>
		);
	};

	const	Collapse = ({ title, children, open = false }) => {
		const [isOpen, setIsOpen] = useState(open);
		const [height, setHeight] = useState(0);
		const contentRef = useRef(null);
	
		const toggleCollapse = () => {
			setIsOpen((prev) => !prev);
		};
	
		useEffect(() => {
			if (contentRef.current) {
				setHeight(isOpen ? contentRef.current.scrollHeight : 0);
			}
		}, [isOpen]);
	
		return (
			<div className="border-b overflow-hidden transition-all duration-300">
				<button
					onClick={toggleCollapse}
					className="w-full flex justify-between items-center py-4 px-2 font-bold text-gray-800 text-lg" 
				>
					<span>{title}</span>
					<span>{isOpen ? "↑" : "↓"}</span>
				</button>
	
				<div
					ref={contentRef}
					style={{
						height: `${height}px`,
						transition: "height 300ms ease, opacity 300ms ease",
						opacity: isOpen ? 1 : 0,
					}}
					className="px-2 text-gray-700 text-sm overflow-hidden text-sm"
				>
					<div aria-hidden={!isOpen}>{children}</div>
				</div>
			</div>
		);
	};

	useEffect(() => {
		fetch("/candies")
			.then((res) => res.json())
			.then((data) => {
				setCandies(data);
			});
		fetch("/carousel")
			.then((res) => res.json())
			.then((data) => {
				setCarouselImages(data);
			});
	}, []);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			{/* Colonne gauche : Carousel + Collapse */}
			<div>

				<Carousel images={carouselImages} />

				<div className="mt-6 space-y-4">
					<Collapse title="Description" open={true}>
						<div className="space-y-2 mb-4">
							<p><strong>Compose ton Mix de Bonbons parfait 🥰</strong></p>
							<p>Découvre <strong>My Candy Bucket</strong>, l'expérience ultime pour tous les amateurs de bonbons ! Imagine-toi plongé dans un seau de 3kg rempli de délices sucrés et gélifiés, où chaque bouchée est une explosion de saveurs. 😍</p>
							<p>Compose ton propre mélange personnalisé en choisissant parmi une variété de bonbons en vrac délicieux. Avec ton seau de bonbons, tu peux mélanger et assortir tes bonbons favoris, créant ainsi ton assortiment unique.</p>
							<p><strong>Pour environ 3kg :</strong> entre 15 et 30 choix (suppléments non compris)*</p>
							<p>Imagine un samedi soir parfait, confortablement installé devant ta série préférée, avec ton seau de bonbons à portée de main. Que ce soit pour te faire plaisir ou pour partager avec tes amis, My Candy Bucket est l'accompagnement parfait pour toutes les occasions. C'est aussi le cadeau idéal pour tous les gourmands. 🍭✨</p>
							<p><strong>Des saveurs pour tous les goûts :</strong> Acidulés, Fruités ou Lisses ? Peu importe tes préférences, notre sélection incroyable satisfera toutes tes envies. ✨🍬⭐🍭</p>
							<p>Et pas d’inquiétude si certains bonbons sont en rupture après ta commande : nous les remplacerons par des équivalents tout aussi délicieux. 🥰</p>
						</div>
					</Collapse>

					<Collapse title="Informations complémentaires">
						<div className="space-y-2 mb-4">
							<p>Sélectionne au minimum <strong>15 produits</strong>. Si tu en choisis moins, nous compléterons avec une sélection de nos Best Sellers.</p>
							<p>Certains bonbons de ton pick’n’mix peuvent être en rupture après ta commande. Si c’est le cas, ils seront remplacés par un équivalent aussi savoureux. :)</p>
						</div>
					</Collapse>

					<Collapse title="Livraison & Retour">
						<div className="space-y-2 mb-4">
							<p><strong>*Disclaimer :</strong> Les chocolats et bonbons sont conservés au frais dans nos locaux. Nous ne pouvons pas garantir leur état lors du transport, notamment en cas de fonte. Merci d’en tenir compte avant de commander 🙂</p>
							<p><strong>Délais de traitement :</strong> Ta commande est préparée sous 3 à 5 jours ouvrés.</p>
							<p><strong>Délais de livraison :</strong></p>
							<ul className="list-disc list-inside">
							<li>France : 3-5 jours ouvrés avec Mondial Relay / 2-3 jours ouvrés avec Colissimo</li>
							<li>Europe : 3-5 jours ouvrés avec Mondial Relay</li>
							<li>DOM 1 : 6 jours ouvrés avec Colissimo</li>
							<li>Canada : 6 jours ouvrés avec Colissimo</li>
							</ul>
							<p><strong>Comment commander ?</strong> Sélectionne tes bonbons préférés, clique sur “Ajouter au panier”, puis finalise ta commande depuis ton panier.</p>
							<p><strong>Important :</strong> Si tu choisis la livraison Mondial Relay, n’oublie pas de sélectionner ton point relais après le paiement sur la carte affichée.</p>
							<p>Nous préparons ta commande avec amour 💕 et tu recevras un mail avec ton numéro de suivi une fois le colis expédié.</p>
						</div>
					</Collapse>
				</div>

			</div>

			{/* Colonne droite: CandySelector */}
			<CandySelector candies={candies} />

		</div>
	);
}

const	root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<CandyApp />);

/* ============================================================
 * FLOTTE ACHANAN CAR — modifiez cette liste pour l'adapter à vos véhicules.
 * id       : identifiant unique (minuscules, chiffres, tirets)
 * photos   : vos vraies photos, ex. ["assets/photos/dacia-logan-1.jpg", "assets/photos/dacia-logan-2.jpg"]
 *            Laissez [] pour afficher l'illustration par défaut.
 * fuel     : "diesel" | "essence" | "hybride"
 * trans    : "manuelle" | "auto"
 * cats     : une ou plusieurs parmi "eco","berline","suv","auto","hybrid","family"
 * featured : true = affichée sur la page d'accueil
 * Pour une nouvelle voiture sans illustration, mettez au moins une photo.
 * ============================================================ */
window.CARS = [
  {"id": "citroen-c3-aircross", "brand": "Citroën", "model": "C3 Aircross Hybride", "year": 0, "fuel": "hybride", "trans": "auto", "seats": 5, "cats": ["suv", "hybrid", "auto"], "featured": true, "photos": []},
  {"id": "citroen-c3", "brand": "Citroën", "model": "Nouvelle C3", "year": 0, "fuel": "essence", "trans": "manuelle", "seats": 5, "cats": ["eco"], "featured": false, "photos": []},
  {"id": "renault-clio-5", "brand": "Renault", "model": "Clio 5", "year": 0, "fuel": "diesel", "trans": "manuelle", "seats": 5, "cats": ["eco"], "featured": false, "photos": []},
  {"id": "dacia-logan", "brand": "Dacia", "model": "Logan BVA", "year": 0, "fuel": "essence", "trans": "auto", "seats": 5, "cats": ["eco", "berline", "auto"], "featured": false, "photos": []},
  {"id": "dacia-stepway", "brand": "Dacia", "model": "Sandero Stepway BVA", "year": 0, "fuel": "essence", "trans": "auto", "seats": 5, "cats": ["eco", "auto"], "featured": true, "photos": []},
  {"id": "renault-arkana", "brand": "Renault", "model": "Arkana Hybride", "year": 0, "fuel": "hybride", "trans": "auto", "seats": 5, "cats": ["suv", "hybrid", "auto"], "featured": true, "photos": []},
  {"id": "kgm-rexton", "brand": "KGM", "model": "Rexton 7 places", "year": 0, "fuel": "diesel", "trans": "auto", "seats": 7, "cats": ["suv", "auto", "family"], "featured": true, "photos": []},
  {"id": "deepal-s07", "brand": "Deepal", "model": "S07 REEV", "year": 0, "fuel": "hybride", "trans": "auto", "seats": 5, "cats": ["suv", "hybrid", "auto"], "featured": true, "photos": []},
  {"id": "jeep-wrangler", "brand": "Jeep", "model": "Wrangler JK Sahara 2 portes", "year": 0, "fuel": "diesel", "trans": "auto", "seats": 4, "cats": ["suv", "auto"], "featured": false, "photos": []},
  {"id": "mercedes-classe-s", "brand": "Mercedes-Benz", "model": "Classe S", "year": 0, "fuel": "diesel", "trans": "auto", "seats": 5, "cats": ["berline", "auto"], "featured": true, "photos": []},
];

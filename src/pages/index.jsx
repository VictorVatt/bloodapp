

function HomePage() {
    return (
      <div className="main_container">
        <div className="banner">
          <h1>LeSang : votre performance, notre science</h1>
          <p className="content">Par Jos Déforges, Hugo Rabesona, Pierre Hernot et Victor Vattier</p>
        </div>
        <h3>Notre projet : </h3>
        <p>Ce site a été créé dans le cadre du module "Outils numériques et suivi de la charge".<br></br><br></br>
        Nous avons réparti les données sous cinq onglets :<br></br> 
        - Données équipes, <br></br>
        - Données physiques, <br></br>
        - Transport oxygène, <br></br>
        - Système immunitaire <br></br>
        - Métabolisme énergétique. <br></br><br></br>
        Après avoir importé le fichier Excel, en <strong>sélectionnant un joueur</strong>, l'onglet "Données physiques" permet d'avoir une vision globale de l'effectif selon un des indicateurs par onglet lors du dernier prélèvement.<br></br> 
        Ensuite, il est possible de consulter, pour chacun des joueurs, l'évolution dans chacun des onglets des indicateurs choisis. <strong>De nouveaux prélèvements </strong>ainsi que de <strong>nouveaux joueurs </strong>peuvent être ajoutés dans la base de données. <br></br>Cependant, il est <strong>impératif</strong> de ne pas <strong>modifier</strong> le format du fichier de base <strong>(noms des variables)</strong>.
        <br></br><br></br>
        Ce application Web à été réaliser entierement en React.
        <br></br><br></br>
        <style color="red" >Par Jos DEFORGES, Hugo RABESONA, Pierre HERNOT, Victor VATTIER</style>
        </p>
      </div>
    );
  }
  
  export default HomePage;
  
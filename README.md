# Monte-Carlo method are approximation

<div class="page-header">
  <h3><img src="external/resources/img/logo_hearc_ingenierie.png" alt="logo_hearc_ingenierie" width="150"> 2231.3 - Numerical Algorithms : Individual Project</h3>
  <p class="lead">Author : Damian Petroff, INF2dlm-b - Last update : 12th June 2018</p>
  <hr>
  <div>
  <h1 class="center">Approximation d'aire grâce à une méthode de Monte Carlo</h1>
  <h2 class="center">Area approximation with Monte-Carlo method</h2>
  </div><br><br>
</div>
<div class="row">
  <div class="col-md-12 col-sm-12">
    <h3><img src="external/resources/img/flag_fr.png" alt="flag_fr" width="20"/> Principe</h3> <!--icon source : https://www.flaticon.com/-->
    <p>
      Le but de ce mini-projet d'étude est d'utiliser une méthode dite de "<abbr title="Le terme méthode de Monte-Carlo, ou méthode Monte-Carlo, désigne une famille de méthodes algorithmiques visant à calculer une valeur numérique approchée en utilisant des procédés aléatoires, c'est-à-dire des techniques probabilistes. Le nom de ces méthodes, qui fait allusion aux jeux de hasard pratiqués à Monte-Carlo, a été inventé en 1947 par Nicholas Metropolis, et publié pour la première fois en 1949 dans un article coécrit avec Stanislaw Ulam.
Source : https://fr.wikipedia.org/wiki/Méthode_de_Monte-Carlo">Monte-Carlo</abbr>" afin d'approximer l'aire de différentes formes ou polygones.<br></p>
    <p>Le principe de la méthode que l'on va utiliser ici est d'encadrer la forme sélectionnée par un carré. Ensuite, on va générer un nombre donné de points aléatoires (en utilisant <code>Math.Random</code>) dans ce carré. On va par la suite calculer un <b>rapport</b>, le nombre de points qui ont été générés à l'intérieur de la forme, divisé par le nombre de points total. Grâce à ce rapport compris entre 0 et 1, on va pouvoir approximer l'aire de la forme en le multipliant par l'aire du carré qui encardre la forme.
    </p>
    <p>Objectifs principaux :
      <ul>
        <li>Approximer π ;</li>
        <li>Reconnaître si des points font partie d'une forme au moyen de divers méthodes de calcul ;</li>
        <li>Constater la précision d'une telle méthode.</li>
      </ul>
    </p>
    <h3><img src="external/resources/img/flag_en.png" alt="flag_en" width="20"/> Main idea</h3> <!--icon source : https://www.flaticon.com/-->
    <p>The objective of this school project is to use the so-called "<abbr title="Monte Carlo methods (or Monte Carlo experiments) are a broad class of computational algorithms that rely on repeated random sampling to obtain numerical results. Their essential idea is using randomness to solve problems that might be deterministic in principle. They are often used in physical and mathematical problems and are most useful when it is difficult or impossible to use other approaches. Monte Carlo methods are mainly used in three problem classes: optimization, numerical integration, and generating draws from a probability distribution.
Source : https://en.wikipedia.org/wiki/Monte_Carlo_method">Monte Carlo</abbr>" method in order to approximate various shapes' or polygons' area.<br></p>
    <p>The idea of this method is to frame the given shape with a square. Thereafter we can generate a given number of random points (using <code>Math.Random</code>) within the square. Thus, we can calculate a <b>ratio</b>. the nomber of points that landed inside the custom shape, divided by the total number of points. Then, the approximated area is the area of the square multiplied by this ratio which is within iterval [0, 1]
    </p>
    <p>Main objectives :
      <ul>
        <li>Approximate π ;</li>
        <li>Use various calculation methods in order to tell if a points is within a shape on a 2D graph ;</li>
        <li>Evaluate the precision of such a method.</li>
      </ul>

  </div>
</div>

<?php
function navBar (){
?>
    <header class="menu">
        <a href="../dashboard/"><span class="menu-title">
            Open PPM
        </span></a>
        <a href="../dashboard/"><span class="menu-item">
            Dashboard
        </span></a>
        <a href="../consultants/"><span class="menu-item">
            Consultants
        </span></a>
        <a href="../customers/"><span class="menu-item">
            Customers
        </span></a>
        <!-- Change the href -->
        <a href="../customers/"><span class="menu-item"> 
            Projects
        </span></a>
        <a href="../technologies/"><span class="menu-item"> 
            Technologies
        </span></a>
        <div class="dropdown">
            <button class="dropbtn">
                <span class="menu-avatar">
                    <img src="../assets/images/avatar.svg" alt="Avatar"/>
                </span>
            </button>
            <div class="dropdown-content">
              <a href="#">Profile</a>
              <a href="#">Settings</a>
              <a href="../logout/">Logout</a>
            </div>
          </div>          
    </header>
    <div class="mob-menu">
        <a href="../dashboard/"><span class="mob-menu-item">
            <div class="mob-menu-item-img">
                <img src="../assets/images/Menu/dashboard.png" alt="Dashboard" class="mob-menu-img"/>
                <p class="mob-menu-item-subtitle">Dashboard</p>
            </div>
        </span></a>
        <a href="../consultants/"><span class="mob-menu-item">
            <div class="mob-menu-item-img">
                <img src="../assets/images/Menu/consultants.png" alt="Consultants" class="mob-menu-img"/>
                <p class="mob-menu-item-subtitle">Consultants</p>
            </div>
        </span></a>
        <a href="../customers/"><span class="mob-menu-item">
            <div class="mob-menu-item-img">
                <img src="../assets/images/Menu/customers.png" alt="Customers" class="mob-menu-img"/>
                <p class="mob-menu-item-subtitle">Customers</p>
            </div>
        </span></a>
        <!-- change href -->
        <a href="../customers/"><span class="mob-menu-item">
            <div class="mob-menu-item-img">
                <img src="../assets/images/Menu/projects.png" alt="Projects" class="mob-menu-img"/>
                <p class="mob-menu-item-subtitle">Projects</p>
            </div>
        </span></a>
        <a href="../technologies/"><span class="mob-menu-item">
            <div class="mob-menu-item-img">
                <img src="../assets/images/Menu/tech.png" alt="Technologies" class="mob-menu-img"/>
                <p class="mob-menu-item-subtitle">Technologies</p>
            </div>
        </span></a>
        <a href="../logout/"><span class="mob-menu-item">
            <div class="mob-menu-item-img">
                <img src="../assets/images/Menu/logout.png" alt="Logout" class="mob-menu-img"/>
                <p class="mob-menu-item-subtitle">Logout</p>
            </div>
        </span></a>
    </div>
<?php
}
?>
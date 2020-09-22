<?php
function navBar (){
?>
    <header class="menu">
        <span class="menu-title">
            Open PPM
        </span>
        <span class="menu-item">
            Dashboard
        </span>
        <a href="../consultants/"><span class="menu-item">
            Consultants
        </span></a>
        <span class="menu-item">
            Customers
        </span>
        <span class="menu-item">
            Projects
        </span>
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
<?php
}
?>
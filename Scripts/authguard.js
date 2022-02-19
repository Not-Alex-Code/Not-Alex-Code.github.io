"use strict";
(function()
{
                //If User Does Not Exist In Session Storage
                if(!sessionStorage.getItem("user"))
                {
                // Redirect To The Login Page
                location.href = "login.html";
                }
})();
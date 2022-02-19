// IIFE -- Immediately Invoked Function Expression
// AKA Anonymous Self-Executing Function
(function()
{

    /**
     * This method uses AJAX to open a connection to the url and returns data to the callback function
     * @param {string} method 
     * @param {string} url 
     * @param {functon} callback 
     */
    function AjaxRequest(method, url, callback)
    {
            // Step 1 - Instantiate An XHR Object
            let XHR = new XMLHttpRequest();

            // Step 2 - Create An Event Listener For Readystatechange Event
            XHR.addEventListener("readystatechange", () =>
            {
                if(XHR.readyState === 4 && XHR.status === 200)
                {
                    callback(XHR.responseText);
                }
            });

            //Step 3 Open A Connection To The Server
            XHR.open(method, url);

            //Step 4 Send The Request To The Server
            XHR.send();
    }

    /**
     * This function loads the header file and injects it into the page
     * @param {string}s data 
     * 
     * 
     */
    function LoadHeader(data)
    {
        $("header").html(data); // data payload
        $(`li>a:contains(${document.title})`).addClass("active"); // add a class of 'active'
        CheckLogin();
    }

    function DisplayAboutPage()
    {
        console.log("About Us Page");
    }

    function DisplayProductPage()
    {
        console.log("Products Page");
    }

    function DisplayServivesPage()
    {
        console.log("Services Page");
    }

    function DisplayHomePage()
    {
        console.log("Home Page");

        AjaxRequest("GET", "header.html", LoadHeader);

        // jQuery Way / Fattest Memeory FootPrint - We Need The jQuery Library
        $("#AboutUsButton").on("click",function()
        {
            location.href = "about.html";
        });
        

            //Step 2 create an element(s) to insert
            //let MainParagraph = document.createElement("p");
            let Article = document.createElement("article");
            let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3"> This Is The Article Paragraph </p>`;

            //Step 4 add /  insert element
            //MainContent.appendChild(MainParagraph);
            $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Pargraph </p>`);
            // Article.innerHTML = ArticleParagraph;
            $("body").append(`<article class="container">
            <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>
            </article>`);

    }
    /**
     *Adds A Contact Object To Local Storage
     *
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName, contactNumber, emailAddress)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress)
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();

            localStorage.setItem(key, contact.serialize());
        }
    }

    /**
     * This method validates an input text field in the form and displays an error in the message area div element
     * @param {string} inpue_field_ID 
     * @param {RegExp} regular_expression 
     * @param {string} error_message 
     */
    
    function ValidateField(input_field_ID, regular_expression, error_message)
    {
        let messageArea = $("#messageArea").hide();

        $("#" + input_field_ID).on("blur", function()
        {
            let input_text_field = $(this).val();
            if(!regular_expression.test(input_text_field))
            {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else
            {
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function ContactFormValidation()
    {
        ValidateField("fullName",/^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+(\s|,|-)*$/,"Please Enter A Valid Full Name. This Must Include At Least A Capitalized First Name Followed By A Capitalized Last Name");
        ValidateField("contactNumber",/^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/,"Please enter a valid Contact Number. Example: (905) 555-5555");
        ValidateField("emailAddress",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,"Please enter a valid Email Address. ");
    }

    function DisplayContactPage()
    {
        console.log("Contact Us Page");
        
        ContactFormValidation();


        let sendButton = document.getElementById("sendButton");
        let subcribeCheckbox = document.getElementById("subcribeCheckbox");

        sendButton.addEventListener("click", function()
        {
    

            if(subcribeCheckbox.checked)
            {
                AddContact(fullName,value, contactNumber.value, emailAddress.value);
            }
        });
    }

    function DisplayContactListPage()
    {
        console.log("Contact-List Page");

        if(localStorage.length > 0) //Check If localStorage Has Something In It
        {
            let contactList = document.getElementById("contactList");

            let data = "";

            let keys = Object.keys(localStorage);
            
            let index = 1;

            //for every key in the keys collection loop
            for(const key of keys)
            {
                let contactData = localStorage.getItem(key); // Retrieve Contact Data From localStorage

                let contact = new core.Contact(); //create an empty Object

                contact.deserialzie(contactData);

                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit </button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete </button></td>
                </tr>
                `;

                index++;
            }

            contactList.innerHTML = data;

            $("#addButton").on("click", () =>
            {
                location.href = "edit.html#add";
            });

            $("button.delete").on("click", function()
            {
                if(confirm("Are You Sure?"))
                {
                    localStorage.removeItem($(this).val());
                }
                location.href = "contact-list.html";
            });

            $("button.edit").on("click", function()
            {
                location.href = "edit.html#" + $(this).val();    
            });
        }
    }

    function DisplayEditPage()
    {
        console.log("Edit Page");

        ContactFormValidation();

        let page = location.hash.substring(1);

        switch(page)
        {
            case "add":
                {
                    $("main>h1").text("Add Contact");

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);

                    $("#editButton").on("click", (event) => 
                    {

                        event.preventDefault();
                        //Add Contact
                        AddContact(fullName.value, contactNumber.value, emailAddress.value);
                        //Refresh The Contact List Page
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    });



                }
            break;
            default:
                {
                    //Get The Contact Info From LocalStorage
                    let contact = new core.Contact();
                    contact.deserialzie(localStorage.getItem(page));

                    //Display The Contact Info In The Edit Form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);
                    
                    //When Edit Is Pressed - Update The Contact
                    $("#editButton").on("click", (event)=>
                    {
                        event.preventDefault();
                        // Get Any Changes
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();

                        //Replace The Item In The Local Storage
                        localStorage.setItem(page, contact.serialize());

                        //Return To The Contact List
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    });
                }
                break;
        }
    }   

    function DisplayLoginPage()
    {
        console.log("Login Page");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function()
        {
            let success = false;

            //create an empty User Object
            let newUser = new core.User();

            // use jQuery shortcut to load the users.json file
            $.get("./Data/users.json", function(data)
            {
                // For Every User In The USers.Json File, Loop
                for (const user of data.users)
                {
                    //Check If Username And Password Entered Match With User Data
                    if (username.value == user.Username && password.value == user.Password)
                    {

                        console.log("condition pass");
                        //get the user data from the file and assign it to our empty object
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                            //If Username And Password Matches - Success....perform Login Sequence
                if (success)
                {
                // Add User To Session Storage
                sessionStorage.setItem("user", newUser.serialize());

                // Hide Any Errors
                messageArea.removeAttr("class").hide();

                //Redirect The User To The Secure Area Of Our Site
                location.href = "contact-list.html";
                }
                else
                {
            //Display An Error Message
                $("#username").trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text("Error: Invalid Login Indromation.").show();
                }
            });


            $("#cancelButton").on("click", function()
            {
                //Clear The Login Form
                document.forms[0].reset();

                //Return To Homepage
                location.href("index.html");
            });
        });
    }

    function CheckLogin()
    {
        if(sessionStorage.getItem("user"))
        {
            // Swap Out The Login Link For The Logout Link
            $("#login").html(
                `<a  id="logout" class="nav-link" aria-current="page" href="login.html"> <i class="fas fa-sign-out-alt"></i> Logout</a>`
            );

            $("#logout").on("click", function()
            {
                sessionStorage.clear();

                location.href("login.html");
            });
        }
    }

    function DisplayRegisterPage()
    {
        console.log("Register Page");
    }

    // named function
    function Start()
    {
        console.log("App Started!!");    
        
                AjaxRequest("GET", "header.html", LoadHeader);

        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;

            case "Contact":
                DisplayContactPage();
                break;

            case "Contact-List":
                DisplayContactListPage();
                break;

            case "About Us":
                DisplayAboutPage();
                break;

            case "Products":
                DisplayProductPage();
                break;

            case "Services":
                DisplayServicesPage();
                break;

            case "Edit":
                DisplayEditPage();
                break;

            case "Login":
                DisplayLoginPage();
                break;

            case "Register":
                DisplayRegisterPage();
                break;
                    

        }
    }
    window.addEventListener("load", Start);

})();
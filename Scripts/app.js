// IIFE -- Immediately Invoked Function Expression
// AKA Anonymous Self-Executing Function
(function()
{

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

        // jQuery Way / Fattest Memeory FootPrint - We Need The jQuery Library
        $("#AboutUsButton").on("click",function()
        {
            location.href = "about.html";
        });
        

            //Step 1 get a reference to an entry point(s) (insertion point / deletion point)
            //let MainContent = document.getElementsByTagName("main")[0];  
            //let DocumentBody = document.body;
            
            //Step 2 create an element(s) to insert
            //let MainParagraph = document.createElement("p");
            let Article = document.createElement("article");
            let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3"> This Is The Article Paragraph </p>`;
            
            //Step 3 configure new element
            //MainParagraph.setAttribute("id", "MainParagraph");
            //MainParagraph.setAttribute("class", "mt-3");

            // let FirstParagraphString = "This is";
            // //Example Of Template Strings
            // let SecondParagraphString = `${FirstParagraphString} The Main Paragraph`;

            // MainParagraph.textContent = SecondParagraphString;
            // Article.setAttribute("class", "container");

            //Step 4 add /  insert element
            //MainContent.appendChild(MainParagraph);
            $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Pargraph </p>`);
            // Article.innerHTML = ArticleParagraph;
            $("body").append(`<article class="container">
            <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>
            </article>`);
            //DocumentBody.appendChild(Article);
            
            
            //Deletion Example
            // document.getElementsById("ArticleParagraph").remove();

            //Insert Before Example
            // let NewH1 = document.createElement("h1");
            // NewH1.setAttribute("class", "display-1");
            
            // MainContent.before(NewH1);

            // NewH1.textContent = "Hello World!";

            

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
    
    function ValidateField(inpue_field_ID, regular_expression, error_message )
    {
        let messageArea = $("#messageArea").hide();

        $("#" + inpue_field_ID).on("blur", function()
        {
            let inpue_field_ID = $(this).val();
            if(!regular_expression.test(inpue_field_ID))
            {
                $(this).trigger("focus").trigger("select");;
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
        let suscribeCheckbox = document.getElementById("suscribeCheckbox");

        sendButton.addEventListener("click", function()
        {
    

            if(suscribeCheckbox.checked)
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
    }

    function DisplayRegisterPage()
    {
        console.log("Register Page");
    }

    // named function
    function Start()
    {
        console.log("App Started!!");     

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
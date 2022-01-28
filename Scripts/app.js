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

        let AboutUsButton = document.getElementById("AboutUsButton");
        
        AboutUsButton.addEventListener("click", function()
        {
            //Redirects To About Page
            location.href = "about.html"
            
        });

            //Step 1 get a reference to an entry point(s) (insertion point / deletion point)
            let MainContent = document.getElementsByTagName("main")[0];  
            let DocumentBody = document.body;
            
            //Step 2 create an element(s) to insert
            let MainParagraph = document.createElement("p");
            let Article = document.createElement("article");
            let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3"> This Is The Article Paragraph </p>`;
            
            //Step 3 configure new element
            MainParagraph.setAttribute("id", "MainParagraph");
            MainParagraph.setAttribute("class", "mt-3");

            let FirstParagraphString = "This is";
            //Example Of Template Strings
            let SecondParagraphString = `${FirstParagraphString} The Main Paragraph`;

            MainParagraph.textContent = SecondParagraphString;
            Article.setAttribute("class", "container");

            //Step 4 add /  insert element
            MainContent.appendChild(MainParagraph);
            Article.innerHTML = ArticleParagraph;
            DocumentBody.appendChild(Article);
            
            
            //Deletion Example
            // document.getElementsById("ArticleParagraph").remove();

            //Insert Before Example
            // let NewH1 = document.createElement("h1");
            // NewH1.setAttribute("class", "display-1");
            
            // MainContent.before(NewH1);

            // NewH1.textContent = "Hello World!";

            

    }

    function DisplayContactPage()
    {
        console.log("Contact Us Page");
        
        let sendButton = document.getElementById("sendButton");
        let suscribeCheckbox = document.getElementById("suscribeCheckbox");

        // localStorage.setItem("1", "Alex");
        // console.log(localStorage.getItem("1"));
        // //localStorage.removeItem("1");
        // console.log(localStorage.length);

        sendButton.addEventListener("click", function()
        {
            

            if(suscribeCheckbox.checked)
            {
                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value)
                if(contact.serialize())
                {
                    let key = contact.FullName.substring(0, 1) + Date.now();

                    localStorage.setItem(key, contact.serialize());
                }
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

                let contact = new Contact(); //create an empty Object

                contact.deserialzie(contactData);

                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td></td>
                <td></td>
                </tr>
                `;
                
                index++;
            }

            contactList.innerHTML = data;
        }
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
        }
    }
    window.addEventListener("load", Start);

})();
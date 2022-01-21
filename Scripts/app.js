// IIFE -- Immediately Invoked Function Expression
// AKA Anonymous Self-Executing Function
(function()
{

    function DisplayHomePage()
    {
        
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

    // named function
    function Start()
    {
        console.log("App Started!!");     

        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
        }
    }
    window.addEventListener("load", Start);

})();
#XHR GET REQUEST with a text response in Rails
## ENVIRONMENT: Ruby 1.9.3, Rails 3.2.13


    1. Create a new project

>rails new rails_xhr_get_text  

    2. Generate a new scaffold and run the migration  

>rails generate scaffold product title:string description:text monthly:boolean  
>rake db:migrate  

    3. Add a hyperlink and paragraph tag to bottom of the products index page to invoke the XHR GET request and display the response.  

>   # app/views/products/index.html.erb
    <p>&lt;a href="#" id="monthly">Get Product of the Month</a></p>
    <p id="tgtTag">resonse here</p>

    4. Create a new XHR script to make a GET request for the product of the month to a specific url that returns a text response.   

>   \# app/assests/javascripts/monthly.js  
    window.onload = function(){  
      var a = document.getElementById('monthly');  
    var tgtTag = document.getElementById('tgtTag');

    a.addEventListener('click', function(e)\{
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'products/monthly');
      xhr.onreadystatechange = function()\{
        if(xhr.readyState == 4 && xhr.status === 200){
          tgtTag.innerHTML = xhr.responseText;
        }
      };
    e.preventDefault();
    xhr.send(null);
  });
};

    ##5. Add a new action to the products controller to grab the first product of the month.
>  
    \# app/controllers/products_controller.rb
    def monthly
      @products = Product.find_by_monthly('t')

      respond_to do |format|
        format.html # index.html.erb
        format.text { render text: @products.title }
        format.js   {}
        format.json { render json: @products }
      end
    end

    ##6. Add a new route for products/monthly that specifically responds with text

   \# config/routes.rb
   match 'products/monthly' => 'products#monthly', format: :text

    ##7. Launch the Rails server, navigate to the products index page(http://localhost:3000/products) and add some products with at least one marked as "monthly". 

    ##8. Click the link on the products index page to get the product of the month.


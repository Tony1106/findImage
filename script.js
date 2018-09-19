 $(function(){



    var accsessKey = "5552427c43ae9153cf1bc2c36b42de2c8bcd2259f643f14d8361936c08795a4e"
    var secretKey = "846f954011711e4271a9d40f47ae1fb4016cb2401a1e70e219a979cc456400e6"
    var totalPage;
    $('.page').hide();

        // $(".search-bar").submit(function(e){
        //     return false
        // })
        document.addEventListener("keydown", function(event) {
            
            console.log(event.which);
            let keyCode = event.keyCode;
            if (keyCode === 13) {
                removeItemForNewSearch();
                $('.page').show();
                submitSearchImage();
                changeHeightBackground();
                addPageToHTML();
                event.preventDefault();
            }
        })
       
        $('.button-search').on("click",  function(){
            removeItemForNewSearch();
            $('.page').show();
            submitSearchImage();
            changeHeightBackground();
            addPageToHTML();
            event.preventDefault();
        });
    // Function interface
    function changeHeightBackground(){
        $('.container-search').css("height", "50vh")
    }
    // Function interface
    
    //Select Page/
    $('.page-number').on("click", function(e){
        var page = e.target.innerHTML
        console.log(e.target.innerHTML, 'e');
        $('.page-number .item').removeClass('active');
        $(e.target).parent().addClass('active');
        console.log(page, 'page');
        removeItemForNewSearch();
        submitSearchImage(page);
        
        
       
    })
    var pagePosition = 0;
    $('#prevPage').click(function(){
        
        if (pagePosition==0){
            return null;
        }
        
        pagePosition-=10;
        console.log('page positon',pagePosition);
        addPageToHTML(1, pagePosition);
    })
    $('#nextPage').click(function(){
        
        if(pagePosition+10>totalPage){
            addPageToHTML(1, pagePosition);
            return;
        } else {
            pagePosition+=10;
            console.log('page positon',pagePosition);
            addPageToHTML(1, pagePosition);
        }
        
    })
    //Select Page/



    //function get Data Search
    function submitSearchImage(page){
        var keyWord = getKeyword();
        console.log(keyWord, 'keyWord');
        getData(keyWord,page).then((data)=> {
            console.log(data.total_pages,'totoalpage');
            totalPage = data.total_pages;
            addHTML(data);
            masonryLayout();
        })
    }
    function getKeyword (){
        var  keyWord =  $( ".search-bar" ).val();
        return keyWord;
        
    }
    function getData (keyWord,page=1){
        var data = $.getJSON(`https://api.unsplash.com/search/photos?query=${keyWord}&page=${page}&client_id=${accsessKey}&per_page=20`, function(data){
    
            return data.results;
         })
       
        return data;
    }
    
    function addHTML(data){
            var newData = data.results;
            console.log(data);
            var item =[];
            newData.map(element => {
                var url = element.urls.regular;
                console.log(url);
                item.push(url);
                
            });
            item.map((i)=> {
                var content = `<div class="image-items">
                <figure>
                    <img src="${i}" alt="">
                </figure>
            </div>`
            $(".item-container").append(content).isotope('reloadItems');
            
            })
            masonryLayout();
            
        }
    function removeItemForNewSearch(){
        $(".image-items").remove()
        $(".item-container").isotope( 'reloadItems' ) ;
    }
    function addPageToHTML(page=1, pagePosition=1){
        $(".page-number .item").remove();
        var targetContainer = document.querySelector(".page-number");
        if(pagePosition===0){
            pagePosition = 1;   
        }
        if (page+10> totalPage){
            for(let i= pagePosition; i<=totalPage;i++) {
                targetContainer.insertAdjacentHTML('beforeend',`<button class="item"><a href="#">${i}</a></button>`);
            }  
        } else {
            for(let i= pagePosition; i<=9+pagePosition;i++) {
                i===1? targetContainer.insertAdjacentHTML('beforeend',`<button class="item active" ><a  href="#">${i}</a></button>`) : targetContainer.insertAdjacentHTML('beforeend',`<button class="item"><a href="#">${i}</a></button>`);
            }  
        }
       
      
    
        
    }


    function masonryLayout(){
        var $grid = $('.item-container').isotope({
            // options
            itemSelector: '.image-items',
            layoutMode: 'masonry',
          });
        //   layout Isotope after each image loads
        $grid.imagesLoaded().progress( function() {
            $grid.isotope('layout');
    });
    }



})  
 
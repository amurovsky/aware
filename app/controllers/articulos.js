var args = arguments[0] || {};

function cerrarVentana(){
	Alloy.Globals.navigator.goBack();
}

//CUSTOM FUNCTION TO DEFINE WHAT HAPPENS WHEN AN ITEM IN THE GRID IS CLICKED
var showGridItemInfo = function(e){
	//alert('Title is: ' + e.source.data.title + '. Image is: ' + e.source.data.image);
	Alloy.Globals.navigator.openWindow('articulo_detalle');
};

var delay = (OS_ANDROID) ? 1000:2000;

$.tdg.init({
    columns:2,
    space:5,
    delayTime:delay,
    gridBackgroundColor:'#fecce7',
    itemBackgroundColor:'#fff',
    itemBorderColor:'transparent',
    itemBorderWidth:0,
    itemBorderRadius:0,
    onItemClick: showGridItemInfo
});

function createSampleData(){
	
	var items = [];
	
    var sample_data = [
        {
        	title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 
	        image:'/gridImg/01.jpg', 
	        subtitle:'25 de nov 15'
        },
        {
        	title:'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.', 
	        image:'/gridImg/02.jpg', 
	        subtitle:'25 de nov 15'
        },
        // {
        	// title:'Do eiusmod tempor incididunt ut labore.', 
	        // image:'/gridImg/03.jpg', 
	        // subtitle:'25 de noviembre 2015'
        // },
        {
        	title:'Consectetur adipisicing elit, sed do.', 
	        image:'/gridImg/04.jpg', 
	        subtitle:'25 de nov 15'
        },
        {
        	title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 
	        image:'/gridImg/014.jpg', 
	        subtitle:'25 de nov 15'
        },
        {
        	title:'Eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
	        image:'/gridImg/06.jpg', 
	        subtitle:'25 de nov 15'
        },
        {
        	title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
	        image:'/gridImg/07.jpg', 
	        subtitle:'25 de nov 15'
        },
        {
        	title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.', 
	        image:'/gridImg/08.jpg', 
	        subtitle:'25 de nov 15'
        },
        {
        	title:'Adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.', 
	        image:'/gridImg/09.jpg', 
	        subtitle:'25 de nov 2015'
        },
        {
        	title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
	        image:'/gridImg/010.jpg', 
	        subtitle:'25 de nov 15'
        },
        {
        	title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.', 
	        image:'/gridImg/011.jpg', 
	        subtitle:'25 de nov 15'
        },
        {
        	title:'Lorem ipsum dolor sit amet.', 
	        image:'/gridImg/012.jpg', 
	        subtitle:'25 de nov 15'
        },
        {
        	title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.', 
	        image:'/gridImg/013.jpg', 
	        subtitle:'25 de nov 15'
        },
        //{title:'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image:'/gridImg/014.jpg', subtitle:'25 de noviembre 2015'}
    ];

// var sample_data = [
        // {
        	// title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 
	        // image:'http://myrtlebeachbirthservices.com/wp-content/uploads/2014/10/breast-cancer-1.jpg', 
	        // subtitle:'25 de noviembre 2015'
        // },
        // {
        	// title:'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.', 
	        // image:'http://www.tunedbody.com/wp-content/uploads/2014/05/Breast-Cancer.jpg', 
	        // subtitle:'25 de noviembre 2015'
        // },
        // {
        	// title:'Do eiusmod tempor incididunt ut labore.', 
	        // image:'http://drhemi.com/wp-content/uploads/2012/10/Breast-Cancer-2.jpg', 
	        // subtitle:'25 de noviembre 2015'
        // },
        // {
        	// title:'Consectetur adipisicing elit, sed do.', 
	        // image:'http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/news/2011/12_2011/advanced_breast_cancer_treatments/493x335_advanced_breast_cancer_treatments.jpg', 
	        // subtitle:'25 de noviembre 2015'
        // },
        // {
        	// title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 
	        // image:'http://static.boredpanda.com/blog/wp-content/uploads/2014/10/breast-cancer-ads-16.jpg', 
	        // subtitle:'25 de noviembre 2015'
        // },
        // {
        	// title:'Eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
	        // image:'http://www.thenaturesfarmacy.com/wp-content/uploads/2014/08/breast-cancer-health-1.jpg', 
	        // subtitle:'25 de noviembre 2015'
        // },
        // {
        	// title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
	        // image:'http://womenadvancenc.org/wp-content/uploads/2014/10/Breast-cancer-survivor.jpg', 
	        // subtitle:'25 de noviembre 2015'
        // },
        // {
        	// title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.', 
	        // image:'http://cdn.inquisitr.com/wp-content/uploads/2012/03/breast-cancer-cadmium-study.jpg', 
	        // subtitle:'25 de noviembre 2015'
        // },
        // {
        	// title:'Adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.', 
	        // image:'http://i.huffpost.com/gen/1333122/thumbs/o-BREAST-CANCER-SURVIVOR-570.jpg?1', 
	        // subtitle:'25 de noviembre 2015'
        // },
        // // {
        	// // title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
	        // // image:'/gridImg/010.jpg', 
	        // // subtitle:'25 de noviembre 2015'
        // // },
        // // {
        	// // title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.', 
	        // // image:'/gridImg/011.jpg', 
	        // // subtitle:'25 de noviembre 2015'
        // // },
        // // {
        	// // title:'Lorem ipsum dolor sit amet.', 
	        // // image:'/gridImg/012.jpg', 
	        // // subtitle:'25 de noviembre 2015'
        // // },
        // // {
        	// // title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.', 
	        // // image:'/gridImg/013.jpg', 
	        // // subtitle:'25 de noviembre 2015'
        // // },
        // //{title:'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image:'/gridImg/014.jpg', subtitle:'25 de noviembre 2015'}
    // ];
    
for (var x=0; x < sample_data.length; x++){
	//CREATES A VIEW WITH OUR CUSTOM LAYOUT
	var view = Alloy.createController('item_layout',{
			image:sample_data[x].image, 
			title:sample_data[x].title,
			subtitle:sample_data[x].subtitle
		}).getView();
		
    //THIS IS THE DATA THAT WE WANT AVAILABLE FOR THIS ITEM WHEN onItemClick OCCURS
    var values = {
        title: sample_data[x].title,
        image: sample_data[x].image,
        subtitle:sample_data[x].subtitle
    };

    //NOW WE PUSH TO THE ARRAY THE VIEW AND THE DATA
    items.push({
        view: view,
        data: values
    });
};

//ADD ALL THE ITEMS TO THE GRID
$.tdg.addGridItems(items);
}
createSampleData();


// ------ Close Event ------//
this.close = function(){
	$.destroy();
}; 
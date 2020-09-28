var myApp=angular.module('myApp',['ngRoute','ngSanitize']);
var subscriberCode=sessionStorage.getItem('subs');

myApp.config(function ($routeProvider,$locationProvider) {
        $locationProvider.hashPrefix('');
    
        $routeProvider.when('/userprofile',{
        templateUrl:'userprofile.html',
        controller:'userprofileController'
       /* css:'profileupdate.css'*/
    })
    $routeProvider.when('/updateprofile',{
        templateUrl:'updateprofile.html',
        controller:'updateprofileController'
        
    })
    $routeProvider.when('/sapage',{
        templateUrl:'sapage.html',
        controller:'sapageController'
        
    })
    $routeProvider.when('/changepassword',{
        templateUrl:'changepassword.html',
        controller:'changePassword'
       
    })
    $routeProvider.when('/planusage',{
        templateUrl:'planusage.html',
        controller:'plansusageController'
       
    })
    $routeProvider.when('/plansprice',{
        templateUrl:'planspricing.html',
        controller:'planspricingController'
        
    })
    $routeProvider.when('/confirmPayment',{
    	templateUrl:'confirmPayment.html',
    	controller:'confirmPaymentController'
    })
    $routeProvider.when('/paymentPage',{
    	templateUrl:'paymentPage.html',
    	controller:'paymentPageController'
    })
    $routeProvider.when('/successPage',{
    	templateUrl:'successPage.html',
    	controller:'successPageController'
    })
    
    $routeProvider.when('/',{
        templateUrl:'userprofile.html'
      
    }).otherwise({
        redirectTo : 'welcome.html'
    });
});


myApp.controller('userprofileController',['$scope','$rootScope','$http','userProfileService',function($scope,$rootScope,$http,userProfileService){
	$rootScope.subscriberCode=subscriberCode;
	console.log("userprofileController");
	console.log($scope);
	$scope.init=function(){
		 
		    $http({
		        method: 'GET',
		        url: 'http://localhost:8081//customerprofile',
		        params: {email: 'om@gmail.com'}
		     }).then(function (response){
		    	 console.log(response);
		    	 $scope.obj=response.data;
		    	 console.log("Obj values")
		    	 console.log($scope.obj);
		    	 userProfileService.userProfileResponse=response.data;
		    	
		     },function (error){

		    	 console.log(error);
		     });
	}

	/*$rootScope.firstName=obj.first_name;
	$rootScope.lastName=obj.last_name;
	$rootScope.emailId=obj.email_id;
	$rootScope.contactNo=obj.contact_no;
	$rootScope.Country=obj.country;*/
}]);

myApp.service("userProfileService", function() {
	var userProfileResponse='';
	
	return userProfileResponse;
	});

myApp.controller('updateprofileController',['$scope','$http',function($scope,$http){
	
	console.log("updateprofileController");
	$scope.init=function(){
		 
		    $http({
		        method: 'GET',
		        url: 'http://localhost:8081//customerprofile',
		        params: {email: 'om@gmail.com'}
		     }).then(function (response){
		    	 console.log(response);
		    	 $scope.firstname=response.data.first_name;
		    	 $scope.lastname=response.data.last_name;
		    	 $scope.email=response.data.email_id;
		    	 $scope.mobile=response.data.contact_no;
		    	
		     },function (error){

		    	 console.log(error);
		     });
		   
		    
		    
		    $http({
		        method: 'GET',
		        url: 'http://localhost:8081//getCountries'
		     }).then(function (d){
		    	 console.log(d);
		    	 $scope.countrylist=d.data;
		     },function (error){

		    	 console.log(error);
		     });

	}
	 $scope.submitUpdateProfile=function(){
			console.log("In click function");
			console.log($scope.country);
			
			 $http({
			        method: 'POST',
			        url: 'http://localhost:8081//updateprofile',
			        //params: {firstname:$scope.firstname,lastname:$scope.lastname,email:$scope.email,contact:$scope.mobile}
			        data: {
			        	'firstname':$scope.firstname,'lastname':$scope.lastname,'email':$scope.email,'mobile':$scope.mobile,
			        	'country':$scope.country},
			        headers: {'Content-Type': 'application/json'}    
			 }).then(function (response){
			    	 console.log(response);
			    	 $scope.msg=response.data.msg;
			    	
			     },function (error){

			    	 console.log(error);
			     });
			   
		}
	
}]);


myApp.controller('sapageController',['$scope','$http',function($scope,$http){
	
	console.log("sapageController");
	$scope.init=function(){
		console.log("init()");
		$scope.inactive= true;
	}
	$scope.EnableDisable = function () {
        $scope.inactive = $scope.comment.length == 0;
    }
	
	$scope.dashboard=function(){
		console.log("In click function");
		$scope.inactive= true;
		console.log($scope.comment);
		
		 $http({
		        method: 'POST',
		        url: 'http://localhost:8081//posresult',
		       
		        data: $scope.comment,
		        headers: {'Content-Type': 'application/json'}    
		 }).then(function (response){
		    	 console.log(response);
		    	 $scope.commentResponse=response.data;
		    	 $scope.msg="Comment Response: ";
		     },function (error){

		    	 console.log(error);
		     });
		   
	}
	
	$scope.reset=function(){
		console.log("In reset function");
		$scope.comment="";
		$scope.commentResponse="";
		$scope.msg="";
		$scope.inactive= true;
	}
	
	/*$scope.upload=function(){
		console.log("In upload function");
		var fd=new FormData()
		angular.forEach($scope.files,function(file){
			fd.append('file',file)
		})
		$http.post('http://localhost:8081//upload',$scope.files,{
		   transformRequest:angular.identity,
	       headers:{'Content-Type': 'undefined'}
		})
		.then(function(d){
			console.log(d);
		})
	}*/

}]);

myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function() {
             scope.$apply(function() {
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);
myApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl) {
       var fd = new FormData();
       fd.append('file', file);
    
      return $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })
       .then(function (response){
	    	 console.log(response);
	    	 file_upload.classList.remove('d-none');
			 spinner.classList.add('d-none');
			 spinner_message.classList.add('d-none');
	    	 return response;
	    	 
	     },function (error){

	    	 console.log(error);
	     });

    }
 }]);
 myApp.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload) {
    $scope.uploadFile = function() {
    	var file_upload=document.getElementById('file_upload');
		var spinner=document.getElementById('spinner');
		var spinner_messager=document.getElementById('spinner_message');
		
		file_upload.classList.add('d-none');
		spinner.classList.remove('d-none');
		spinner_message.classList.remove('d-none');
		
       var file = $scope.myFile;
       console.log('file is ' );
       console.dir(file);
       var uploadUrl = "http://localhost:8081//upload";
       var msg=fileUpload.uploadFileToUrl(file, uploadUrl);
       msg.then(function(response){
    	   $scope.msg=response.data;
       })
    };
 }]);
 
 myApp.controller('changePassword',['$scope','$http',function($scope,$http){
		
		console.log("changePassword");
		console.log($scope);
		
		$scope.changePass=function(){
			console.log("In click function");
			
			 $http({
			        method: 'POST',
			        url: 'http://localhost:8081//changepass',
			       
			        data: {
			        	'oldpassword':$scope.oldpassword,'newpassword':$scope.pass,'confirmpassword':$scope.confpass},
			        headers: {'Content-Type': 'application/json'}    
			 }).then(function (response){
			    	 console.log(response);
			    	// $scope.confPassMsg=response.data.msg;
			    	
			     },function (error){

			    	 console.log(error);
			     });
			   
		}
	

	}]);
 
 
 myApp.controller('plansusageController',['$scope','$http',function($scope,$http){
		
		console.log("plansusageController");
		
		$scope.init=function(){
			console.log("init()");
			 $http({
			        method: 'GET',
			        url: 'http://localhost:8081//userplans',
			        headers: {'Content-Type': 'application/json'}    
			 }).then(function (response){
			    	 console.log(response);
			    	 console.log("Current Plans");
			    	 console.log(response.data.current_plan);
			    	 $scope.plan_start_date=response.data.current_plan.plan_start_date;
			    	 $scope.plan_end_date=response.data.current_plan.plan_end_date;
			    	 $scope.used_queries_count=response.data.current_plan.used_queries_count;
			    	 $scope.leftover_queries_count=response.data.current_plan.leftover_queries_count;
			    	
			     },function (error){

			    	 console.log(error);
			     });
		}
	

}]);
 
 
 myApp.controller('planspricingController',['$scope','$rootScope','$location','$http','userProfileService','plansPricingService',function($scope,$rootScope,$location,$http,userProfileService,plansPricingService){
		
		console.log("planspricingController");
		
		$scope.init=function(){
			console.log("init()");
			 $http({
			        method: 'GET',
			        url: 'http://localhost:8081//getplans',
			        headers: {'Content-Type': 'application/json'}    
			 }).then(function (response){
			    	 console.log(response);
			    	 $scope.planDetails=response;
			    	 console.log("Current Plans");
			    	 console.log(response.data);
			    	
			     },function (error){

			    	 console.log(error);
			     });
		}
		$scope.plan='';
		$scope.buyPlan=function(){
			console.log("In buyPlan()");
			console.log($scope.planSelected);
			var planDetails=$scope.planSelected.toString();
			console.log("Using split ");
			var plan_value=planDetails.split(',')[0];
			var plan_desc=planDetails.split(',')[1];
			 $scope.planChoosen=[];
			 $scope.planChoosen.push(plan_value);
			 $scope.planChoosen.push(plan_desc);
			console.log("plan value is: "+plan_value);
			console.log("plan desc is: "+plan_desc);
			console.log(userProfileService.userProfileResponse);
			plansPricingService. planSelected=$scope.planChoosen;
			$location.url('/confirmPayment');
		}
	

}]);

 myApp.service('plansPricingService', function() {
	 var planSelected = [];
		
		return planSelected;
		});
 
 myApp.controller('confirmPaymentController',['$scope','$http','$location','plansPricingService','userProfileService','confirmPaymentService',function($scope,$http,$location,plansPricingService,userProfileService,confirmPaymentService){
		
		console.log("confirmPaymentController");
		console.log(userProfileService.userProfileResponse);
		console.log(plansPricingService.planSelected);
		$scope.ProfileResponse=userProfileService.userProfileResponse;
		/*$scope.first_name=userProfileService.userProfileResponse.first_name;
		$scope.last_name=userProfileService.userProfileResponse.last_name;
		$scope.email_id=userProfileService.userProfileResponse.email_id;
		$scope.planDesc=plansPricingService.planSelected[1];
		$scope.planValue=plansPricingService.planSelected[0];*/
		$scope.planSelect=plansPricingService.planSelected;
		$scope.createOrder=function(){
			console.log("createOrder()");
			
			$http({
			        method: 'POST',
			        url: 'http://localhost:8081//createOrder',
			        data: {
			        	'first_name':$scope.first_name,'last_name':$scope.last_name,'email_id':$scope.email_id,'planValue':$scope.planValue,'planDesc':$scope.planDesc},
			        headers: {'Content-Type': 'application/json'}    
			 }).then(function (response){
			    	 console.log(response);
			    	 confirmPaymentService.confirmPaymentResponse=response;
			    	 $location.url('/paymentPage'); 
			    	 
			     },function (error){

			    	 console.log(error);
			     });
		}
	

}]);
 
 myApp.service('confirmPaymentService', function() {
	 var confirmPaymentResponse = '';
		
		return confirmPaymentResponse;
		});
 
 myApp.controller('paymentPageController',['$scope','$http','$location','plansPricingService','userProfileService','confirmPaymentService','paymentPageService',function($scope,$http,$location,plansPricingService,userProfileService,confirmPaymentService,paymentPageService){
	 $scope.init=function(){
			console.log("paymentPageController");
			console.log(confirmPaymentService.confirmPaymentResponse.data.id);
			$scope.confirmResponse=confirmPaymentService.confirmPaymentResponse.data;
			$scope.planSelect=plansPricingService.planSelected;
			
		}
	
	 $scope.paymentRzr=function(){
		 
		 console.log("paymentRzr ()");
		 console.log(confirmPaymentService.confirmPaymentResponse.data.amount);
		 $scope.paymentResponse=[];
		 
		 var options = {
				    "key": "rzp_test_4dUEbMGrbz8SHm", // Enter the Key ID generated from the Dashboard
				    "amount": 89900, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
				    "currency": "INR",
				    "name": "Acme Corp",
				    "description": "Test Transaction",
				    "image": "https://example.com/your_logo",
				    "order_id": confirmPaymentService.confirmPaymentResponse.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
				    "handler": function (response){
				        alert("Payment Id = "+response.razorpay_payment_id);
				        alert("Order Id = "+response.razorpay_order_id);
				        alert("Signature = "+response.razorpay_signature);
				        //sessionStorage.setItem('paymentId',response.razorpay_payment_id);
				        //callSuccessPage();
				        $scope.paymentResponse.push(response.razorpay_payment_id);
				        $scope.paymentResponse.push(response.razorpay_order_id);
				        $scope.paymentResponse.push(response.razorpay_signature);
				      /*  paymentResponse[0]=response.razorpay_payment_id;
				        paymentResponse[1]=response.razorpay_order_id;
				        paymentResponse[2]=response.razorpay_signature;*/
				       paymentPageService.paymentDetails=$scope.paymentResponse;
				       console.log("Payment details "+paymentPageService.paymentDetails);
				       $scope.callSuccessPage();
				    
				    },
				    "prefill": {
				    	"name": userProfileService.userProfileResponse.first_name,
				        "email":userProfileService.userProfileResponse.email_id,
				        "contact": userProfileService.userProfileResponse.contact_no
				    },
				    "notes": {
				        "address": "Razorpay Corporate Office"
				    },
				    "theme": {
				        "color": "#F37254"
				    }
				};
		 
		 var rzp1 = new Razorpay(options);
		 
		 rzp1.open();
		 
	 }
	 
	 $scope.callSuccessPage=function(){
		 console.log("callSuccessPage");
		 $location.url('/successPage');
		 $scope.$apply();
	 }
 }]);
 
 myApp.service('paymentPageService', function() {
	 var paymentDetails = [];
		
		return paymentDetails;
		});
 
 myApp.service('successPageViewService', function(){
   	 
 });
 
 myApp.controller('successPageController',['$scope','$http','$location','plansPricingService','userProfileService','confirmPaymentService','paymentPageService',function($scope,$http,$location,plansPricingService,userProfileService,confirmPaymentService,paymentPageService){
		
		console.log("successPageController");
		console.log(userProfileService.userProfileResponse);
		console.log(plansPricingService.planSelected);
		$scope.ProfileResponse=userProfileService.userProfileResponse;
		/*$scope.first_name=userProfileService.userProfileResponse.first_name;
		$scope.last_name=userProfileService.userProfileResponse.last_name;
		$scope.email_id=userProfileService.userProfileResponse.email_id;
		$scope.planDesc=plansPricingService.planSelected[1];
		$scope.planValue=plansPricingService.planSelected[0];*/
		$scope.planSelect=plansPricingService.planSelected;
		$scope.init=function(){
			console.log("init()");
			$scope.transactionId=paymentPageService.paymentDetails[0];
			$scope.amount=plansPricingService.planSelected[0];
		}
		
		$scope.planusagePage=function(){
			$location.url("/planusage");
		}

}]);
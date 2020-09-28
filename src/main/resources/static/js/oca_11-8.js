
$(document).ready(function(){
/*	$('[data-toggle="popover"]').popover({
		   title:validatePassword,
		   html:true,
		   placement:'right'
		});*/
 // $("#btn").hide();
  $("#firstnameMsg").hide();
  $("#lastnameMsg").hide();
  $("#emailMsg").hide();
  $("#passMsg").hide();
  $("#confPassMsg").hide();
  $("#mobileMsg").hide();

  document.getElementById("lastname").disabled = true;
  document.getElementById("email").disabled = true;
  document.getElementById("pass").disabled = true;
  document.getElementById("confpass").disabled = true;
  document.getElementById("mobile").disabled = true;

  var error_fname=false;
  var error_lname=false;
  var error_email=false;
  var error_password=false;
  var error_repassword=false;
  var error_mobile=false;

  $("#firstname").focusout(function(){
	if(!check_fname())
	{
		document.getElementById("lastname").disabled = false;
		document.getElementById("lastname").focus();
	}
	buttonState();
  });

  $("#lastname").focusout(function(){
	if(!check_lname())
	{
		document.getElementById("email").disabled = false;
		document.getElementById("email").focus();
	}
	buttonState();
  });

  $("#email").focusout(function(){
	if(!validateEmail())
	{
		document.getElementById("pass").disabled = false;
		document.getElementById("pass").focus();
	}
	buttonState();
  });
	 
  // use focusout event on password
  $("#pass").focusout(function(){
	if(!validatePassword())
	{
		 document.getElementById("confpass").disabled = false;
		 document.getElementById("confpass").focus();
	}
	buttonState();
  });


  $("#confpass").focusout(function(){
	if(!check_retype_password())
	{
		document.getElementById("mobile").disabled = false;
		document.getElementById("mobile").focus();
	}
	buttonState();
  });

  //use focusout event on mobile

   $("#mobile").focusout(function(){
	validateMobile();
	buttonState();
  });

}); 



function check_fname()
  {
	var pattern=/^[a-zA-Z]*$/;
	var fname=$("#firstname").val();
	if(pattern.test(fname) && fname !==''){
	  $("#firstnameMsg").hide();
	  $("#firstname").css("border","3px solid deepskyblue");
	}
	else if(fname === ''){
	   
	  $("#firstnameMsg").html("<p class='text-danger'>Please enter First name</p>");
	  $("#firstnameMsg").hide();
	  $("#firstname").css("border","2px solid deepskyblue");
	  return error_fname=true; 
	}
	else{
	  $("#firstnameMsg").html("<p class='text-danger'>Should contain only characters</p>");
	  $("#firstnameMsg").show();
	  $("#firstname").css("border","2px solid red");
	  return error_fname=true;
	}
  }

  function check_lname()
  {
	var pattern=/^[a-zA-Z]*$/;
	var lname=$("#lastname").val();
	if(pattern.test(lname) && lname !==''){
	  $("#lastnameMsg").hide();
	  $("#lastname").css("border","3px solid deepskyblue");
	}

	else if(lname ===''){
	  $("#lastnameMsg").html("<p class='text-danger'>Enter Last name</p>");
	  $("#lastnameMsg").hide();
	  $("#lastname").css("border","2px solid deepskyblue");
	  return error_lname=true;
	}
	else{
	  $("#lastnameMsg").html("<p class='text-danger'>Should contain only characters</p>");
	  $("#lastnameMsg").show();
	  $("#lastname").css("border","2px solid red");
	  return error_lname=true;
	}
  }

function validateEmail(){
  // get value of input email
  var email=$("#email").val();
  // use regular expression
   var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
   if(reg.test(email) && email !== ''){
	$("#emailMsg").hide();
	$("#email").css("border","3px solid deepskyblue");
   }
   else if(email === ''){
	$("#emailMsg").html("<p class='text-danger'>Enter email</p>");
	  $("#emailMsg").hide();
	  $("#email").css("border","2px solid deepskyblue");
	  return error_email=true;
   }
   else{
	$("#emailMsg").html("<p class='text-danger'>Invalid email</p>");
	  $("#emailMsg").show();
	  $("#email").css("border","2px solid red");
	  return error_email=true;
   }

}
function validatePassword(){
	// var fetch_data='';
  //get input password value
  var pass=$("#pass").val();
  var reg=/(?=^.{8,}$)(?=.*\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
  //use regular expression
  if(reg.test(pass) && pass !== ''){
	$("#passMsg").hide();
	$("#pass").css("border","3px solid deepskyblue");
  }
  else if(pass === ''){
	  $("#passMsg").html("<p class='text-danger'>Enter Password</p>");
	  $("#passMsg").hide();
	  $("#pass").css("border","2px solid deepskyblue");
	  return error_password=true;
	 // fetch_data="<p class='text-danger'>Enter Password</p>";
	  
  }
  else{
	$("#passMsg").html("<p class='text-danger'>Should contain atleast 1 Uppercase,1 special charcter and number</p>");
	  $("#passMsg").show();
	  $("#pass").css("border","2px solid red");
	  return error_password=true;
	  //fetch_data="<p class='text-danger'>Should contain atleast 1 Uppercase,1 special character and number</p>";
  }

  //return fetch_data;
}

function check_retype_password()
  {
	var password=$("#pass").val();
	var  retype_password=$("#confpass").val();
	

	 if(retype_password === ''){
	  $("#confPassMsg").html("<p class='text-danger'>Enter password</p>");
	  $("#confPassMsg").hide();
	  $("#confpass").css("border","2px solid deepskyblue");
	  return error_repassword=true;
	}
	else if(password !== retype_password)
	{
		  $("#confPassMsg").html("<p class='text-danger'>Passwords did not match</p>");
		  $("#confPassMsg").show();
		  $("#confpass").css("border","2px solid red");
		  return error_repassword=true;
	}
	else{
	  $("#confPassMsg").hide();
	  $("#confpass").css("border","3px solid deepskyblue");
	}
  }

function validateMobile(){
	 // get value of mobile input
	 var mobile=$("#mobile").val();
  //use regular expression
  var reg=/^(0|[+91]{3})?[7-9][0-9]{9}$/;

  if(reg.test(mobile) && mobile !== '')
  {
	$("#mobileMsg").hide();
	$("#mobile").css("border","3px solid deepskyblue");
  }
  else if(mobile === '')
  {
	$("#mobileMsg").html("<p class='text-danger'>Enter mobile</p>");
	  $("#mobileMsg").hide();
	  $("#mobile").css("border","2px solid deepskyblue");
	  return error_mobile=true;
  }
  else{
	$("#mobileMsg").html("<p class='text-danger'>Invalid mobile</p>");
	  $("#mobileMsg").show();
	  $("#mobile").css("border","2px solid red");
	  return error_mobile=true;
  }
}

function buttonState(){
	var btn = document.getElementById('btn');
	btn.disabled = true;
	if(!check_fname()&& !check_lname()&& !validateEmail()&& !validatePassword()&& !check_retype_password() && !validateMobile())
	{
		var btn = document.getElementById('btn');
		btn.disabled = false;
	}
  
}
  // if(validateEmail() && validatePassword()){
  //   // if the both email and password are validate
  //   // then button should show visible
  //   $("#btn").removeAttr('disabled');
  // }else{
  //   // if both email and pasword are not validated
  //   // button state should hidden
  //   //$("#btn").attr('disabled',true);
  // }


  function getCountries()
{
	var req= new XMLHttpRequest();
	req.open("GET", "/countries", true);
	req.send();
	req.onreadystatechange=function() 
	{
		
		if (req.readyState==4 && req.status==200)
		{
			var obj = JSON.parse(req.responseText);
			var country= document.getElementById("country");
			for(var i=0; i<obj["countries"].length; i++)
				{
					//alert(obj["countries"][i])
				var op=document.createElement("option");
				op.value=obj["countries"][i];
		
				op.text=obj["countries"][i];
				country.add(op);
				
				}
		}
	}
}

 
  function register()
  {
	var btn = document.getElementById('btn');
	btn.disabled = true;
	btn.style.backgroundColor="#39ace7";
    var firstname=document.getElementById("firstname").value;
    var lastname=document.getElementById("lastname").value;
    var pass=document.getElementById("pass").value;
    var confpass=document.getElementById("confpass").value;
    var email=document.getElementById("email").value;
    var mobile=document.getElementById("mobile").value;
    var country=document.getElementById("country").value;

    var req=new XMLHttpRequest();
    req.open("POST", "/register", "true");
    var student={firstname:firstname, lastname:lastname,pass:pass,confpass:confpass,email:email,mobile:mobile,country:country};

    var stujson=JSON.stringify(student);
    
    req.setRequestHeader("Content-type","application/json");
    
    req.send(stujson);
    req.onreadystatechange=function()
    {
  	if(req.readyState==4 && req.status==200)
  	{
  	
  		 var data=req.responseText;
  		 var jsonResponse = JSON.parse(req.responseText);
     	     alert(jsonResponse["msg"]);
  		  document.getElementById("registerMsg").style.color="red";
  		  document.getElementById("registerMsg").innerHTML=jsonResponse["msg"];
  		 
  	  
  	}
  	
    }
  }



function login()
{
  var btn = document.getElementById('btn');
  btn.disabled = true;
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  var message='';
  var subscribercode='';
  var req=new XMLHttpRequest();
  req.open("POST", "/login", "true");
  var student={email:email,password:password};

  var stujson=JSON.stringify(student);
  
  req.setRequestHeader("Content-type","application/json");
  
  req.send(stujson);
  req.onreadystatechange=function()
  {
	if(req.readyState==4 && req.status==200)
	{
		
		var jsonResponse=req.responseText;
		var obj= JSON.parse(req.responseText);
		
		for(x in obj){
			if(x == "msg")
				{
				message=obj[x];
				}
			else{
				subscribercode=obj[x];
			}
			
		}
		
		if(message == "valid credentials")
			{
			 sessionStorage.setItem('subs',subscribercode);
			 sessionStorage.setItem('emailId',email);
			 window.location="/userprofile";
			}
		
		else{
			
			document.getElementById("loginMsg").style.color="red";
			document.getElementById("loginMsg").innerHTML=message;
		}
		
	}
  }
}


function redirectRegisterPage()
{
	 window.location="/";
}



function chgPass() 
{	
     var btn = document.getElementById('PassBtn');
	 btn.disabled = true;
	 btn.style.backgroundColor="#39ace7";
    var newPassword=document.getElementById("pass").value;
    var confirmPassword=document.getElementById("confpass").value;
	
    var student={new_pass:newPassword};
	
	var stujson=JSON.stringify(student);
	 
     var req=new XMLHttpRequest();
	 req.open("POST", "/chgpass", "true");
	 
	 req.setRequestHeader("Content-type","application/json");
	  
	 req.send(stujson);
	  
	 req.onreadystatechange=function()
	  {
		if(req.readyState==4 && req.status==200)
		{
			alert(req.responseText);
			
			var jsonResponse=req.responseText;
			var obj= JSON.parse(req.responseText);
			
			for(x in obj){
				if(x == "msg")
					{
						message=obj[x];
					}				
			   }
			   
				document.getElementById("passwordMsg").style.color="red";
				document.getElementById("passwordMsg").innerHTML=message;
		
			
	       }
			
	  }
 }

function userprofilePage()
{
  window.location="/userprofile"	
}

function saPage()
{

	window.location="/reviewform"
}
function updateprofilePage() 
{

	window.location="/updateprofilepage";
}

function planusage() 
{

	window.location="/planusage";
}

function planspricePage()
{
	
	window.location="/plansAndpricing";
}

/*Customer Profile function*/
function customerProfile()
{
	 var firstname='';
	 var lastname='';
	 var emailId='';
	 var country='';
	 var state='';
	 var city='';
	 var contact='';
	 var code=sessionStorage.getItem('subs');
	 var email=sessionStorage.getItem('emailId');
	 
    
	 var req=new XMLHttpRequest();
	 req.open("GET", "/customerprofile?email="+email, "true");
	 
	 req.setRequestHeader("Content-type","application/json");
	  
	  req.send();
	  req.onreadystatechange=function()
	  {
		if(req.readyState==4 && req.status==200)
		{
			
			var jsonResponse=req.responseText;
			var obj= JSON.parse(req.responseText);
			
			for(x in obj){
				if(x == "first_name")
					{
					firstname=obj[x];
					}
				else if(x == "last_name")
					{
					lastname=obj[x];
					}
				else if(x == "email_id")
					{
					emailId=obj[x];
					}
				else if(x == "country")
					{
					country=obj[x];
					}
				else if(x == "state")
					{
					state=obj[x];
					}
				else if(x == "city")
					{
					city=obj[x];
					}
				else if(x == "contact_no")
				    {
				    contact=obj[x];
				    }
			    }
			
			document.getElementById("firstName").style.color="blue";
			document.getElementById("firstName").innerHTML=firstname;
			
			document.getElementById("lastName").style.color="blue";
			document.getElementById("lastName").innerHTML=lastname;
			
			document.getElementById("email").style.color="blue";
			document.getElementById("email").innerHTML=emailId;
			
			document.getElementById("country").style.color="blue";
			document.getElementById("country").innerHTML=country;
			
			document.getElementById("contact").style.color="blue";
			document.getElementById("contact").innerHTML=contact;
			
			//document.getElementById("state").style.color="blue";
			//document.getElementById("state").innerHTML=state;
			
			//document.getElementById("city").style.color="blue";
			//document.getElementById("city").innerHTML=city;
			document.getElementById("subscribeCode").innerHTML=code;
			sessionStorage.obj = JSON.stringify(obj);
			
			sessionStorage.setItem('first_name',firstname);
			sessionStorage.setItem('last_name',lastname);
			sessionStorage.setItem('contact',contact);
			
			
  	     }
	  }
 }
 
 function profileupdate()
{	
	 
	 var code=sessionStorage.getItem('subs');
	 var email=sessionStorage.getItem('emailId');
	
     document.getElementById("subscribeCode").innerHTML=code;
	
     var req=new XMLHttpRequest();
	 req.open("GET", "/customerprofile?email="+email, "true");
	 
	 req.setRequestHeader("Content-type","application/json");
	  
	 req.send();
	  
	 //var obj = JSON.parse(sessionStorage.obj);
	 req.onreadystatechange=function()
	  {
		if(req.readyState==4 && req.status==200)
		{
			
			var jsonResponse=req.responseText;
			var obj= JSON.parse(req.responseText);
			
			for(x in obj){
		 
			if(x == "first_name")
				{
				firstname=obj[x];
				}
			else if(x == "last_name")
				{
				lastname=obj[x];
				}
			else if(x == "email_id")
				{
				emailId=obj[x];
				}
			else if(x == "country")
				{
				country=obj[x];
				}
			else if(x == "contact_no")
				{
				mobile=obj[x];
				}
	      }
			
			
			//document.getElementById("firstname").style.color="blue";
			document.getElementById("firstname").value=firstname;
			
			//document.getElementById("lastname").style.color="blue";
			document.getElementById("lastname").value=lastname;
			
			//document.getElementById("email").style.color="blue";
			document.getElementById("email").value=emailId;
			
			//document.getElementById("country").style.color="blue";
			var sel = document.getElementById("country");
			var opt = sel.options[sel.selectedIndex];
			opt.value = country;
			opt.text = country;
			
			document.getElementById("mobile").value=mobile;
			getCountries()
			
		}
	  }
			
	
  	
}

 function submitUpdateProfile()
{	
	 var btn = document.getElementById('updateBtn');
	 btn.disabled = true;
	 btn.style.backgroundColor="#39ace7";
	 var code=sessionStorage.getItem('subs');
	 document.getElementById("subscribeCode").innerHTML=code;
	
	//alert(code);
	 var firstname=document.getElementById("firstname").value;
	 var lastname=document.getElementById("lastname").value;
	 var email=document.getElementById("email").value;
	 var country=document.getElementById("country").value;
	 var mobile=document.getElementById("mobile").value;
	// var pincode=document.getElementById("pincode").value;
	 
	 var req=new XMLHttpRequest();
	 req.open("POST", "/updateprofile", "true");
	 req.setRequestHeader("Content-type","application/json");
	 req.setRequestHeader("Token",code);
	 
	 var student={first_name:firstname, last_name:lastname,email_id:email,contact_no:mobile,country:country};

	 var stujson=JSON.stringify(student);
	 //print(stujson);
	 req.send(stujson);
	 req.onreadystatechange=function()
	  {
		if(req.readyState==4 && req.status==200)
		{
			
			var jsonResponse=req.responseText;
			var obj= JSON.parse(req.responseText);
			for(x in obj)
			{
			 var message=obj[x];
			 alert(obj["msg"]);
			 
			}
			//document.getElementById("update_msg").style.color="blue";
			document.getElementById("update_msg").innerHTML="Profile Updated";
      var btn = document.getElementById('updateBtn');
			btn.disabled = false;
			
		 }
			
  	   }
			
}

function planUsage()
{
	
	var code=sessionStorage.getItem('subs');
	document.getElementById("subscribeCode").innerHTML=code;
	
	 //alert(code);
	
	
	var req=new XMLHttpRequest();
	 req.open("GET", "/userplans", "true");
	 
	 req.setRequestHeader("Content-type","application/json");
	 req.setRequestHeader("Token",code);
	  
	  req.send();
	  req.onreadystatechange=function()
	  {
		if(req.readyState==4 && req.status==200)
		{
			
			var jsonResponse=req.responseText;
			var obj= JSON.parse(req.responseText);
			
			for(x in obj){
				if (x == "current_plan")
				{
				//alert(x);
				for (j in obj[x])
				{
					//alert(obj[x][j])
				if(j == "plan_id")
					{
					plan_id=obj[x][j];
					}
				else if(j == "plan_description")
					{
					plan_description=obj[x][j];
					}
				else if(j == "plan_value")
					{
					plan_value=obj[x][j];
					}
				else if(j == "plan_validity_days")
					{
					plan_validity_days=obj[x][j];
					}
				else if(j == "plan_start_date")
					{
					plan_start_date=obj[x][j];
					}
				else if(j == "plan_end_date")
					{
					plan_end_date=obj[x][j];
					}
				else if(j == "used_queries_count")
				  {
				   used_queries_count=obj[x][j];
				  }
			   else if(j == "leftover_queries_count")
				 {
				  leftover_queries_count=obj[x][j];
				 }
				}
			 }
			 
			 }

			
			document.getElementById("my_td").rows[0].cells.namedItem("plan_start_date").innerHTML=plan_start_date;
			document.getElementById("my_td").rows[1].cells.namedItem("plan_end_date").innerHTML=plan_end_date;
			document.getElementById("my_td").rows[2].cells.namedItem("used_queries_count").innerHTML=used_queries_count;
			document.getElementById("my_td").rows[3].cells.namedItem("leftover_queries_count").innerHTML=leftover_queries_count;
			
			/*var table=document.getElementById('mytable');
			  
			   for(i in obj)
				{
				 if(i== "available_plans")
				 {
				  for(j in obj[i])
				   {
					 
					  var row=table.insertRow();
					  
					  var cell1=row.insertCell();
					 
					  
					 for(k in obj[i][j])
					 {	  
					 if(k == "plan_description" || k == "plan_max_queries")
					 {	 
					  var cell=row.insertCell();
					  cell.innerHTML=obj[i][j][k];
					  cell.style.textAlign = "center";
					 
					  cell.style.color = "blue";
					 }
					 
					 if( k == "plan_validity_days" )
					 {
						 var cell=row.insertCell();
						  cell.innerHTML=obj[i][j][k]+"(days)";
						  cell.style.textAlign = "center";
						  cell.style.color = "blue";
					 }
					 
					 if( k == "plan_value" )
					 {
						 var cell=row.insertCell();
						  cell.innerHTML="INR."+obj[i][j][k];
						  cell.style.textAlign = "center";
						  cell.style.color = "blue";
					 }
				     }
				  var cell=row.insertCell();
				  var button = document.createElement('button');          
				  var bText = document.createTextNode('Buy');    
				  button.className="btn btn-success";
				  button.appendChild(bText);  
				  cell.appendChild(button);
				 }
				}
				}
*/
			
			
			
			
			
		}
	  }
	  
}

function plansAndpricing()
{
	var code=sessionStorage.getItem('subs');
    document.getElementById("subscribeCode").innerHTML=code;
	 var req=new XMLHttpRequest();
	 req.open("GET", "/getplans", "true");
	 
	 req.setRequestHeader("Content-type","application/json");
	 req.setRequestHeader("Token",code);
	  
	  req.send();
	  req.onreadystatechange=function()
	  {
		if(req.readyState==4 && req.status==200)
		{
			
			var jsonResponse=req.responseText;
			
			var data=JSON.parse(jsonResponse);
	
   var table=document.getElementById('mytable');
  
   for(i in data)
	{
	 
	  for(j in data[i])
	   {
		  var row=table.insertRow();
		  
		  var cell1=row.insertCell();
		 
		  
		 for(k in data[i][j])
		 {	  
			 
		 if(k == "plan_description" || k == "plan_max_queries")
		 {	 
		  var cell=row.insertCell();
		  cell.innerHTML=data[i][j][k];
		  cell.style.textAlign = "center";
		  cell.style.color = "blue";
		 }
		 
		 if( k == "plan_validity_days" )
		 {
			 var cell=row.insertCell();
			  cell.innerHTML=data[i][j][k]+"(days)";
			  cell.style.textAlign = "center";
			  cell.style.color = "blue";
		 }
		 
		 if( k == "plan_value" )
		 {
			 var cell=row.insertCell();
			  cell.innerHTML="INR."+data[i][j][k];
			  cell.style.textAlign = "center";
			  cell.style.color = "blue";
		 }
	     }
	  var cell=row.insertCell();
/*	 radioButton.type='radio';
	  radioButton.id='plan';
	  radioButton.value=data[i][j]["plan_description"];
	  console.log(radioButton.value);*/
	  
	  radioInput = document.createElement('input');
      radioInput.setAttribute('type', 'radio');
      radioInput.setAttribute('name', 'plans');
      radioInput.value=data[i][j][k];
      radioInput.description=data[i][j]["plan_description"];
	  cell.appendChild(radioInput);
	  
	 

	 }
	}
      var row=table.insertRow();
      var cell1=row.insertCell();
	  var cell2=row.insertCell();
	  var cell3=row.insertCell();
	  var cell4=row.insertCell();
	  var cell5=row.insertCell();
	  var cell6=row.insertCell();
	  
	  var butn = document.createElement('button');          
	  var bText = document.createTextNode('Buy');    
	  butn.className="btn btn-success";
	  butn.appendChild(bText);  
	  cell4.appendChild(butn);
	 
	  butn.onclick=function(event){
		  
		  event.preventDefault();
		  var ele = document.getElementsByName('plans'); 
	     for(i = 0; i < ele.length; i++) { 
	         if(ele[i].checked){ 
	         var planValue=ele[i].value;
	         var planDesc=ele[i].description;
	         
	         }
	     } 
	     
	     sessionStorage.setItem('planValue',planValue);
	     sessionStorage.setItem('planDesc',planDesc);
	     confirmPaymentPage();
	  };
 }
		
}
	  
}

function confirmPaymentPage()
{
  window.location.replace("/confirmPayment");
}

/*confirmPayment function*/
function confirmPayment()
{   
	var code=sessionStorage.getItem('subs');
	var firstname=sessionStorage.getItem('first_name');
	var lastname=sessionStorage.getItem('last_name');
	var email=sessionStorage.getItem('emailId');
	var planValue=sessionStorage.getItem('planValue');
	var planDesc=sessionStorage.getItem('planDesc');
	var mobile=sessionStorage.getItem('contact');
	
	document.getElementById("subscribeCode").innerHTML=code;
	document.getElementById("firstName").style.color="blue";
	document.getElementById("firstName").innerHTML=firstname;
	
	document.getElementById("lastName").style.color="blue";
	document.getElementById("lastName").innerHTML=lastname;
	
	document.getElementById("email").style.color="blue";
	document.getElementById("email").innerHTML=email;
	
	document.getElementById("planDesc").style.color="blue";
	document.getElementById("planDesc").innerHTML=planDesc;
	
	document.getElementById("planValue").style.color="blue";
	document.getElementById("planValue").innerHTML=planValue;
	
}

function reset(){
	var btn = document.getElementById('btnSubmit');
	btn.disabled = false;
    var resetButton = document.getElementById("comment");
    var cmntResponse=document.getElementById("commentResponse");
    var srLang=document.getElementById("src_lang");
    var trsText=document.getElementById("trs_text");
        if(resetButton){
        resetButton.value= "";
        cmntResponse.value="";
        srLang.value="";
        trsText.value="";
          document.getElementById("commentResponse").innerHTML="";
		  document.getElementById("src_lang").innerHTML="";
		  document.getElementById("trs_text").innerHTML="";
        }
    }


function changePwdPage()
{
	 window.location="/changePassword";
}



function changePass() 
{	
	var btn = document.getElementById('btn');
	btn.disabled = true;
	btn.style.backgroundColor="#39ace7";
	var code=sessionStorage.getItem('subs');
	 
	 
    document.getElementById("subscribeCode").innerHTML=code;
    var oldPassword=document.getElementById("oldpassword").value;
    var newPassword=document.getElementById("pass").value;
    var confirmPassword=document.getElementById("confpass").value;
	
    var student={old_pass:oldPassword, new_pass:newPassword};

	var stujson=JSON.stringify(student);
	 
     var req=new XMLHttpRequest();
	 req.open("POST", "/changepass", "true");
	 
	 req.setRequestHeader("Content-type","application/json");
	  
	 req.send(stujson);
	  
	 req.onreadystatechange=function()
	  {
		if(req.readyState==4 && req.status==200)
		{
			alert(req.responseText);
			
			
			var jsonResponse=req.responseText;
			var obj= JSON.parse(req.responseText);
			
			for(x in obj){
				if(x == "msg")
					{
					message=obj[x];
					}
				else{
					subscribercode=obj[x];
				   }
				
			   }
			
			if(message == "Success")
				{
				 sessionStorage.setItem('subs',subscribercode);
				 sessionStorage.setItem('emailId',email);
				 alert("Password Updated Successfull");
				}
			
			else{
				
				document.getElementById("passwordMsg").style.color="red";
				document.getElementById("passwordMsg").innerHTML=message;
			  }
		
			
	       }
			
	  }
 }
function forgotPassword()
{
	 window.location="/forgotPasswordPage";
}


function forgotPwdApiCall()
{
	 var btn = document.getElementById('btn');
	 btn.disabled = true;
	 btn.style.backgroundColor="#39ace7";
	 var email=document.getElementById("email").value;
	 
	 var req=new XMLHttpRequest();
	 req.open("POST", "/forgotpassword?email="+email, "true");
	 
	 req.setRequestHeader("Content-type","application/json");
	  
	 req.send();
	  
	 req.onreadystatechange=function()
	  {
		if(req.readyState==4 && req.status==200)
		{
			var jsonResponse=req.responseText;
			var obj= JSON.parse(req.responseText);
			for(x in obj){
				if(x == "msg")
					{
					message=obj[x];
					}
			    }
			
			document.getElementById("forgotPwdMsg").innerHTML=message;
		}
	  }
	
}	

function paymentPage()
{
	window.location="/paymentPage";
}
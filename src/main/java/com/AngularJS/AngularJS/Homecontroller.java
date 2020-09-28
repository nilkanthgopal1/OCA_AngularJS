package com.AngularJS.AngularJS;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Timer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Controller
public class Homecontroller {
	
	@Autowired
	private StudentRepo repo;
	
	@Autowired
	private CountryRepo cRepo;
	
	@RequestMapping("/")
	public String welcome()
	{
		System.out.println("In welcome page API");
		return "welcome";
	}
	
	@RequestMapping("/signup")
	public String registration()
	{
		System.out.println("In registration page API");
		return "registration";
	}

	@RequestMapping("/login")
	public String login()
	{
		System.out.println("In login API");
		return "login";
	}
	
	/*@RequestMapping("/userprofile")
	public String dashboard()
	{
		System.out.println("In dashboard API");
		return "userprofile";
	}	*/
	
	/*@RequestMapping("/forgotPasswordPage")
	public String forgotPwdPage()
	{
		System.out.println("In forgotPwdPage API");
		return "forgotPassword";
	}	
	
	@RequestMapping("/updateprofilepage")
	public String updateprofilepage()
	{
		System.out.println("In updateprofilepage API");
		return "updateprofilepage";
	}	
	
	@RequestMapping("/reviewform")
	public String sapage()
	{
		System.out.println("In sapage API");
		return "sapage";
	}	
	*/
	@RequestMapping("/index")
	public String userprofilePage()
	{
		System.out.println("In indexPage API");
		return "index";
	}	
	
	/*@RequestMapping("/planusage")
	public String planUsagePage()
	{
		System.out.println("In planUsagePage API");
		return "plansusage";
	}
	
	@RequestMapping("/plansAndpricing")
	public String plansAndpricingPage()
	{
		System.out.println("In plansAndpricingPage API");
		return "plansAndpricing";
	}
	
	@RequestMapping("/changePassword")
	public String changePassword()
	{
		System.out.println("In changePasswordPage API");
		return "changePassword";
	}
	*/
	@RequestMapping("/confirmPayment")
	public String confirmPayment()
	{
		System.out.println("In confirmPayment");
		return "confirmPayment";
	}
	
	@RequestMapping("/paymentPage")
	public String paymentPage()
	{
		System.out.println("In paymentPage API");
		return "paymentPage";
	}
	
	@RequestMapping("/successPage")
	public String successPage()
	{
		System.out.println("In successPage API");
		return "successPage";
	}
	@PostMapping("/signup")
	@ResponseBody
	public String register(@RequestBody Student stu)
	{
		System.out.println(stu.getFirstname());
		System.out.println(stu.getLastname());
		repo.save(stu);
		return "{\"msg\":\"Registration Successfull\"}";
	}
	
	@PostMapping("/login")
	@ResponseBody
	public String loginPage(@RequestBody Student stu)
	{
		System.out.println("In loginCheck");
		System.out.println(stu.getEmail());
		String email=stu.getEmail();
		String pwd=stu.getPass();
		if(repo.findByEmail(email).equals(null)){
			System.out.println("In if cond");
			return "{\"msg\":\"Invalid Credentials\"}";
		}
		else{
			System.out.println("In else cond");
			return "{\"msg\":\"valid credentials\",\"subscriber_code\":\"uytrsdfgiogfd\"}";
		}
		
	}
	
	
	
	@PostMapping("/posresult")
	@ResponseBody
	public String dashBoardMsg(@RequestBody String review)
	{
		System.out.println("In dashBoardMsg");
		System.out.println(review);
		
		
		return"{\"data\":\"Positive Comment\"}";
	}
	
	@GetMapping("/customerprofile")
	@ResponseBody
	public String customerprofile(@RequestParam(value="email") String email)
	{
		//String mail=email;
		System.out.println("In customerprofile API");
		System.out.println(email);
		
		
		return"{\"city\": \"Pune\",\"contact_no\": 9980987654,\"country\":\"India\",\"cust_id\": 120,\"email_id\":\"varsha.kumari@hoonartek.com\",\"first_name\": \"varsha\", \"is_active\": 1,\"isd_code\": \"91\",\"last_name\": \"kumari\",\"leftover_queries_count\": 998,\"max_queries_count\": 1000,\"old_password\": null,\"password\": \"Test1234\",\"pincode\": \"411028\",\"plan_end_date\": \"07/30/20\",\"plan_id\": -99,\"plan_start_date\": \"06/30/20\",\"state\": \"MH\",\"subscriber_code\": \"990C694725707103813E37096B69322542B9C9A8B665142F298563D4\",\"todays_login_attempt\": 0,\"update_dttm\": \"07/01/20\",\"used_queries_count\": 2,\"wrong_login_attempt\": 0}";
	}
	
	@PostMapping("/updateprofile")
	@ResponseBody
	public String profileupdate(@RequestBody Student stu)
	{
		//Student stu=repo.findByEmail(email);
		String first_name=stu.getFirstname();
		String last_name=stu.getLastname();
		String email_id=stu.getEmail();
		String country=stu.getCountry();
		long contact=stu.getMobile();
		String pass=stu.getPass();
		
		System.out.println(first_name+" "+last_name+" "+email_id+" "+country+" "+contact);
		System.out.println("Record Updated successfully");
		return "{\"msg\": \"Record Updated\"}";
	}
	
	@GetMapping("/userplans")
	@ResponseBody
	public String userplans()
	{
		
		System.out.println("In userplans API");
		
		
		return"{\"available_plans\":[{\"plan_description\": \"monthly plan\",\"plan_expiry_date\": \"06/01/21\",\"plan_id\": 101,\"plan_launch_date\": \"06/01/20\",\"plan_max_queries\": 1000,\"plan_validity_days\": 30,\"plan_value\": 399},{\"plan_description\": \"3-months plan\",\"plan_expiry_date\": \"06/01/21\",\"plan_id\": 102,\"plan_launch_date\":\"06/01/20\",\"plan_max_queries\": 5000,\"plan_validity_days\": 90,\"plan_value\": 899}],\"current_plan\":{\"plan_start_date\": \"06/30/20\", \"plan_end_date\": \"07/30/20\", \"used_queries_count\": 0, \"leftover_queries_count\": 1000}}";
	}
	
	@GetMapping("/getplans")
	@ResponseBody
	public String getplans()
	{
		
		System.out.println("In getplans API");
		
		
		
		return"{\"plans\":[{\"plan_description\": \"monthly plan\",\"plan_expiry_date\": \"06/01/21\",\"plan_id\": 101,\"plan_launch_date\": \"06/01/20\",\"plan_max_queries\": 1000,\"plan_validity_days\": 30,\"plan_value\": 399},{\"plan_description\": \"3-months plan\",\"plan_expiry_date\": \"06/01/21\",\"plan_id\": 102,\"plan_launch_date\": \"06/01/20\",\"plan_max_queries\": 5000,\"plan_validity_days\": 90,\"plan_value\": 899}]}";
   }
	
	
	@PostMapping("/changepass")
	@ResponseBody
	public String changepass(@RequestBody Student stu)
	{
		//String mail=email;
		System.out.println("In ChangePassword API");
		System.out.println(stu.toString());
		return"{\"msg\":\"Error\"} ";
	}
	
	@PostMapping("/forgotpassword")
	@ResponseBody
	public String forgotpassword(@RequestParam(value="email") String email)
	{
		//String mail=email;
		System.out.println("In forgotpassword API");
		System.out.println(email);
		
		
		return"{\"msg\":\"Email has been sent to update password\"} ";
	}
	
	private static String UPLOAD_FOLDER = "E://upload_file//";
	
	@PostMapping("/upload")
	@ResponseBody
	public String fileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) throws InterruptedException {
 
           	System.out.println("In upload API");	
		try {
			// read and write the file to the selected location-
		
			Thread.sleep(30000);
			byte[] bytes = file.getBytes();
			Path path = Paths.get(UPLOAD_FOLDER + file.getOriginalFilename());
			Files.write(path, bytes);

		} catch (IOException e) {
			e.printStackTrace();
		}

		System.out.println("File Uploaded sucessfully");
		
		return "{\"msg\":\"File Uploaded sucessfully\"}" ;
	}


	
/*	@PostMapping("/upload")
	@ResponseBody
	public String upload()
	{
		//String mail=email;
		System.out.println("In Upload API");
		Runnable r= new Runnable() {
			public void run() {
				
				 try {
					   System.out.println("In sleep mode");
			            // thread to sleep for 1000 milliseconds
			            Thread.sleep(30000);
			            System.out.println("Out of sleep mode");
			         } catch (Exception e) {
			            System.out.println(e);
			         }
			}
		};
		
		Thread t=new Thread(r);
		synchronized (t) {
			t.start();
		}
		
		
		
		Object lock=new Object();
		Timer timer=new Timer();
		TimerTask task=new TimerTask() {
			
			@Override
			public void run() {
				// TODO Auto-generated method stub
				
				synchronized (lock) {
					try {
						   System.out.println("In sleep mode");
				            // thread to sleep for 1000 milliseconds
				            Thread.sleep(30000);
				            System.out.println("Out of sleep mode");
				         } catch (Exception e) {
				            System.out.println(e);
				         }
				}
				
				
			}
		};
		timer.schedule(task, 1000, 10*1000);
		synchronized (lock) {
			lock.wait();
		}
		
		
		
		return"Downloading";
	}*/
	
	@GetMapping("/downloadFile")
	public ResponseEntity<Object>  downloadFile() throws FileNotFoundException
	{
		String filename="E:\\downloadFileCSV.csv";
		File file=new File(filename);
		InputStreamResource resource=new InputStreamResource(new FileInputStream(file));
		HttpHeaders headers=new HttpHeaders();
		headers.add("Content-Disposition",String.format("attachment;filename=\"%s\"",file.getName()));
		
		ResponseEntity<Object> responseEntity=ResponseEntity.ok().headers(headers).contentLength(file.length()).contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")).body(resource);
		return responseEntity;
		
	}
	
	
	@PostMapping("/createOrder")
	@ResponseBody
	public String createOrder(@RequestBody Student stu)
	{
		//String mail=email;
		System.out.println("In createOrder API");
		int amount=stu.getPlanValue();
		
		return"{\"id\":\"order_Fa7TlLVRkMYvC5\",\"entity\":\"order\",\"amount\":89900,\"amount_paid\":0,\"amount_due\":500,\"currency\":\"INR\",\"receipt\":\"receipt#1\",\"offer_id\":null,\"status\":\"created\",\"attempts\":0,\"notes\":[],\"created_at\":1596522805} ";
	}
	
	
	@GetMapping("/getCountries")
	@ResponseBody
	public List getCountries()
	{
		
		System.out.println("In getCountries API");
		
		List<Country> clist=(List<Country>) cRepo.findAll();
		for (Country country : clist) {
			System.out.println("List of countries "+country.getName());
		}
		
		return clist;
	}
}
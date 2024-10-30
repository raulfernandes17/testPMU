frappe.ready(function() {
	// bind events here
	frappe.web_form.set_value(["leave_apply_date"], frappe.datetime.get_today())

	frappe.web_form.set_value(["tfg_username"], [frappe.session.user])

	return frappe.call({
			
		method: "pmu_app.pmu_app.web_form.leave_application.leave_application.get_leave_balance_on",
		args: {
			tfg_id: frappe.session.user
			
			
			
		},
		callback: function (r) {
			//frappe.msgprint(r);
			frappe.web_form.set_value(["tfg_name"], [r.message.name1])
			frappe.web_form.set_value(["section"], [r.message.section])

			
		},
	});

	

	frappe.web_form.on('to_date', (field, value) => {
		//frappe.msgprint('Value must be more than 1000');

		to_date = value;
		from_date = frappe.web_form.get_value(["from_date"]);

		if (to_date < from_date) {
			//frappe.msgprint('Value must be more than 1000');
			field.set_value(0);
			frappe.web_form.set_value(["from_date"], 0)

			}

			
			number_of_days = frappe.datetime.get_day_diff( to_date, from_date ) + 1 ;
			
			
			frappe.web_form.set_value(["total_leave_days"], number_of_days);
		
	   });


	   frappe.web_form.on('half_day', (field, value) => {
		//frappe.msgprint('Value must be more than 1000');

		from_date = frappe.web_form.get_value(["from_date"]);
		to_date = frappe.web_form.get_value(["to_date"]);

		if(value)
		{
			if(from_date == to_date)
			{
				frappe.web_form.set_value(["half_day_date"], [to_date]);
			}else{
				//open trigger half day date
			}
		}else{
			frappe.web_form.set_value(["half_day_date"], 0);
		}


		number_of_days = frappe.datetime.get_day_diff( to_date, from_date ) + 0.5;
			
			
		frappe.web_form.set_value(["total_leave_days"], number_of_days);


		

		

		
		
	   });


	   

})
import frappe # type: ignore

def get_context(context):
	# do your magic here
	pass


@frappe.whitelist()
def get_leave_balance_on(tfg_id: str):

	data = frappe.db.sql("""SELECT name1,section FROM `tabTFG_Table` WHERE username='mangesh@gmail.com'""",as_dict=1)

	for d in data:
		return d

	"""  frappe.msgprint(("Name and Section: {0}({1})").format(d.name1,d.section))
	Returns leave balance till date
	:param employee: employee name
	:param leave_type: leave type
	:param date: date to check balance on
	:param to_date: future date to check for allocation expiry
	:param consider_all_leaves_in_the_allocation_period: consider all leaves taken till the allocation end date
	:param for_consumption: flag to check if leave balance is required for consumption or display
	        eg: employee has leave balance = 10 but allocation is expiring in 1 day so employee can only consume 1 leave
	        in this case leave_balance = 10 but leave_balance_for_consumption = 1
	        if True, returns a dict eg: {'leave_balance': 10, 'leave_balance_for_consumption': 1}
	        else, returns leave_balance (in this case 10)
	

	if not to_date:
		to_date = nowdate()

	allocation_records = get_leave_allocation_records(employee, date, leave_type)
	allocation = allocation_records.get(leave_type, frappe._dict())

	end_date = allocation.to_date if cint(consider_all_leaves_in_the_allocation_period) else date
	cf_expiry = get_allocation_expiry_for_cf_leaves(employee, leave_type, to_date, allocation.from_date)

	leaves_taken = get_leaves_for_period(employee, leave_type, allocation.from_date, end_date)

	remaining_leaves = get_remaining_leaves(allocation, leaves_taken, date, cf_expiry)


	if for_consumption:
		
	else:
		return "remaining_leaves.get"
		"""
	
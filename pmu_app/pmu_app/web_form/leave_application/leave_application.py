import frappe # type: ignore

def get_context(context):
	# do your magic here
	pass


@frappe.whitelist()
def get_leave_balance_on(tfg_id: str):

	#tfg_id="mangesh@gmail.com"

	data = frappe.db.sql("""SELECT name1,section FROM `tabTFG_Table` WHERE username='{0}'""".format(tfg_id),as_dict=1)

	for d in data:
		return d
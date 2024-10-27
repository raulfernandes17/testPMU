# Copyright (c) 2024, Raul and contributors
# For license information, please see license.txt

import datetime

import frappe
from frappe.model.document import Document
from frappe.utils import (
	add_days,
	cint,
	cstr,
	date_diff,
	flt,
	formatdate,
	get_fullname,
	get_link_to_form,
	getdate,
	nowdate,
)


class Leaves_Table(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		approval_pd: DF.Literal["Open", "Approved", "Rejected", "Cancelled"]
		approval_po: DF.Literal["Open", "Approved", "Rejected", "Cancelled"]
		approval_sh: DF.Literal["Open", "Approved", "Rejected", "Cancelled"]
		approval_to: DF.Literal["Open", "Approved", "Rejected", "Cancelled"]
		from_date: DF.Date
		half_day: DF.Check
		half_day_date: DF.Date | None
		half_day_for: DF.Literal["First Half", "Second Half"]
		leave_balance_before_application: DF.Float
		leave_status: DF.Literal["Open", "Approved", "Rejected", "Cancelled"]
		leave_type: DF.Literal["Causal", "Sick"]
		posting_date: DF.Date | None
		reason: DF.SmallText | None
		section: DF.Link | None
		tfg: DF.Data
		to_date: DF.Date
		total_leave_days: DF.Float
	# end: auto-generated types

@frappe.whitelist()
def get_number_of_leave_days(
	
	leave_type: str,
	from_date: datetime.date,
	to_date: datetime.date,
	half_day: int | str | None = None,
	half_day_date: datetime.date | str | None = None,
	holiday_list: str | None = None,
) -> float:
	"""Returns number of leave days between 2 dates after considering half day and holidays
	(Based on the include_holiday setting in Leave Type)"""
	number_of_days = 0
	if cint(half_day) == 1:
		if getdate(from_date) == getdate(to_date):
			number_of_days = 0.5
		elif half_day_date and getdate(from_date) <= getdate(half_day_date) <= getdate(to_date):
			number_of_days = date_diff(to_date, from_date) + 0.5
		else:
			number_of_days = date_diff(to_date, from_date) + 1
	else:
		number_of_days = date_diff(to_date, from_date) + 1

	
	return number_of_days




	pass


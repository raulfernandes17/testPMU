// Copyright (c) 2024, Raul and contributors
// For license information, please see license.txt

 frappe.ui.form.on("Leaves_Table", {
// 	refresh(frm) {

// 	},


onload: function (frm) {
    // Ignore cancellation of doctype on cancel all.
    //frm.ignore_doctypes_on_cancel_all = ["Leave Ledger Entry"];

    if (!frm.doc.posting_date) {
        frm.set_value("leave_apply_date", frappe.datetime.get_today());
    }
   
},

validate: function (frm) {
    if (frm.doc.from_date === frm.doc.to_date && cint(frm.doc.half_day)) {
        f rm.doc.half_day_date = frm.doc.from_date;
    } else if (frm.doc.half_day === 0) {
        frm.doc.half_day_date = "";
    }
    frm.toggle_reqd("half_day_date", cint(frm.doc.half_day));
},


refresh: function (frm) {
    hrms.leave_utils.add_view_ledger_button(frm);

    if (frm.is_new()) {
        frm.trigger("calculate_total_days");
    }

    frm.set_intro("");
    if (frm.doc.__islocal && !in_list(frappe.user_roles, "Employee")) {
        frm.set_intro(__("Fill the form and save it"));
    } else if (
        frm.perm[0] &&
        frm.perm[0].submit &&
        !frm.is_dirty() &&
        !frm.is_new() &&
        !frappe.model.has_workflow(frm.doctype) &&
        frm.doc.docstatus === 0
    ) {
        frm.set_intro(__("Submit this Leave Application to confirm."));
    }

    frm.trigger("set_employee");
    if (frm.doc.docstatus === 0) {
        frm.trigger("make_dashboard");
    }
},





half_day: function (frm) {
    if (frm.doc.half_day) {
        if (frm.doc.from_date == frm.doc.to_date) {
            frm.set_value("half_day_date", frm.doc.from_date);
        } else {
            frm.trigger("half_day_datepicker");
        }
    } else {
        frm.set_value("half_day_date", "");
    }
    frm.trigger("calculate_total_days");
},

from_date: function (frm) {
    frm.events.validate_from_to_date(frm, "to_date");
    //frm.trigger("make_dashboard");
    frm.trigger("half_day_datepicker");
    frm.trigger("calculate_total_days");
},

to_date: function (frm) {
    frm.events.validate_from_to_date(frm, "from_date");
    //frm.trigger("make_dashboard");
    frm.trigger("half_day_datepicker");
    frm.trigger("calculate_total_days");
    //frm.set_value("total_leave_days", 1);
},

half_day_date(frm) {
    frm.trigger("calculate_total_days");
},

validate_from_to_date: function (frm, null_date) {
    const from_date = Date.parse(frm.doc.from_date);
    const to_date = Date.parse(frm.doc.to_date);
    if (to_date < from_date) frm.set_value(null_date, "");
},

half_day_datepicker: function (frm) {
    frm.set_value("half_day_date", "");
    if (!(frm.doc.half_day && frm.doc.from_date && frm.doc.to_date)) return;

    const half_day_datepicker = frm.fields_dict.half_day_date.datepicker;
    half_day_datepicker.update({
        minDate: frappe.datetime.str_to_obj(frm.doc.from_date),
        maxDate: frappe.datetime.str_to_obj(frm.doc.to_date),
    });
},



calculate_total_days: function (frm) {
    if (frm.doc.from_date && frm.doc.to_date && frm.doc.leave_type) {
        // server call is done to include holidays in leave days calculations
        return frappe.call({
            method: "frappe.pmu.doctype.leaves.leaves.get_number_of_leave_days",
            args: {
                
                leave_type: frm.doc.leave_type,
                from_date: frm.doc.from_date,
                to_date: frm.doc.to_date,
                half_day: frm.doc.half_day,
                half_day_date: frm.doc.half_day_date,
            },
            callback: function (r) {
                if (r && r.message) {
                    frm.set_value("total_leave_days", r.message);
                    frm.trigger("get_leave_balance");
                }
            },
        });
    }
},


 });

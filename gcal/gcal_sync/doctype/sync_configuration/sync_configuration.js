/*cur_frm.cscript.sync_calender = function(doc){
	// console.log(doc)
	return frappe.call({
		method:"gcal.gcal_sync.doctype.sync_configuration.sync_configuration.sync_calender",
		callback: function(r){
			if (r.message)
				if(r.message.url)
					window.location.replace(r.message);
				if(r.message.is_synced)
					frappe.msgprint("Google Calendar Events synced sucessfully")
			else
				frappe.msgprint("Error occured please try after some time")
		}
	})
}*/

cur_frm.cscript.validate = function(){
	doc = cur_frm.doc
	if (doc.gmail_id){
		if(doc.is_sync)
			return frappe.call({
				freeze:true,
				freeze_message:"Syncing Events",
				method:"gcal.gcal_sync.doctype.sync_configuration.sync_configuration.sync_calender",
				callback: function(r){
					if (r.message)
						if(r.message.url)
							window.location.replace(r.message.url);
						if(r.message.is_synced)
							show_alert("Google Calendar Events synced sucessfully")
					else
						frappe.msgprint("Error occured please try after some time")
				}
			})
	}
	else
		frappe.msgprint("Gmail Id fields is mandatory")
}

cur_frm.cscript.onload = function(){
	if(cur_frm.doc.is_sync)
		hide_gcal_fields(cur_frm.doc.is_sync);
	else
		hide_gcal_fields(0);
}

cur_frm.cscript.is_sync = function(doc){
	hide_gcal_fields(doc.is_sync)
}

hide_gcal_fields = function(is_sync){
	cur_frm.set_df_property("section_break_2", "hidden", is_sync == 0);
}

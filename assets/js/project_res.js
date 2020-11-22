let projID_res = -1;
function project_res_flex_load(itemlist) {
    projID_res = itemlist;
    $("#project_res_flex").flexigrid
    ({
            url: 'project_res.php',
            dataType: 'json',
            colModel : [
                {display: 'ID', name : 'id', width : 80, sortable : true, align: 'center', hide: true},
                {display: 'ResID', name : 'resid', width : 80, sortable : true, align: 'left', hide: true},
                {display: 'PID', name : 'pid', width : 80, sortable : true, align: 'left', hide: true},
                {display: 'Name', name : 'name', width : 150, sortable : true, align: 'left'},
                {display: 'Email', name : 'email', width : 150, sortable : true, align: 'left'},
                {display: 'Designation', name : 'desg', width : 150, sortable : true, align: 'left'},
                {display: 'Hourly Rate', name : 'Hourly_Rate', width : 150, sortable : true, align: 'left'},
                {display: 'Estimated Effort', name : 'Estimate_Effort', width : 150, sortable : true, align: 'left'},
                {display: 'Actual Effort', name : 'Actual_Effort', width : 150, sortable : true, align: 'left'},
                {display: 'Relative Percentage Completed', name : 'Relative_Percentage_completed', width : 300, sortable : true, align: 'left'},
                {display: 'Overtime Allowed', name : 'ot_allowed', width : 150, sortable : true, align: 'left'},
                {display: 'Overtime Rate', name : 'ot_rate', width : 150, sortable : true, align: 'left'},
                {display: 'Resource Role', name : 'resource_role', width : 150, sortable : true, align: 'left'},
            ],
            buttons : [
                {name: 'Add', bclass: 'add', onpress : Res_Grid_Actions},
                {name: 'Edit', bclass: 'edit', onpress : Res_Grid_Actions},
                {name: 'Delete', bclass: 'delete', onpress : Res_Grid_Actions},
                {separator: true}
            ],
            searchitems : [
                {display: 'Name', name : 'name', isdefault: true},
                {display: 'Email', name : 'email'},
                {display: 'Designation', name : 'desg'}
            ],
            sortname: "name",
            sortorder: "asc",
            usepager: true,
            title: 'Resources',
            useRp: true,
            rp: 15,
            showTableToggleBtn: false,
            width: 600,
            height: 300,
            singleSelect: true,
            id: itemlist

        }
    );
};

function Res_Grid_Actions(com,grid)
{
    if (com==='Delete')
    {
        // confirm('Delete ' + $('.trSelected',grid).length + ' items?')

        if ($('.trSelected',grid).length>0) {
            jConfirm('<b>Action cannot be reverted ! </b> Confirm...', '', function(user_act) {
                if (user_act) {

                    if ($('.trSelected',grid).length>0) {

                        var items = $('.trSelected', grid);
                        var itemlist = items[0].id.substr(3);
                        // alert(itemlist);
                        $.ajax({
                            url: 'delete_proj_res.php',
                            type: 'POST',
                            data: {
                                id: itemlist
                            },
                            error: (e)=>{
                                console.error(e);
                            },
                            success: (response)=>{
                                if (response.success) {
                                    jAlert(response.message, "S");
                                    // Flex Reload
                                    $('#project_res_flex').flexReload();
                                } else {
                                    jAlert(response.message, "E");
                                }
                            }
                        });
                        
                    }
                } else {
                    return false;
                }
            });
        } else {
            jAlert('Record Not Selected!', 'E');
        }
    }
    else if (com==='Add')
    {
        
        $.ajax({
            url: 'get_res_list.php',
            type: 'POST',
            data:{
                id: projID_res
            },
            error: (e)=>{
                console.error(e);
            },
            success: (response)=>{
                    // jAlert(response.message, "S");
                let resList = "<option disabled selected value> -- select an option -- </option>";
                response.forEach(item =>{ // Append the value and option name
                    resList += `<option value="${item.id}">${item.title}</option>`;
                });
                // Flex Reload
                $('#project_res_flex_form').empty().html(
                    "<div class='sidepanel-contents'>" +
                        "<h3 class='sidepanel-title'>Add Project Resources</h3>" +
                        "<select class='sidepanel-select' id='project_res_add'></select>" +
                        "<input class='sidepanel-input' type='text' placeholder='Hourly Rate' maxlength='200' id='projects_res_hrate_add'/>" +
                        "<input class='sidepanel-input' type='text' placeholder='Estimate Effort' maxlength='200' id='projects_res_eseff_add'/>" +
                        "<input class='sidepanel-input' type='text' placeholder='Actual Effort' maxlength='200' id='projects_res_aceff_add'/>" +
                        "<input class='sidepanel-input' type='text' placeholder='Relative Percentage Completed' maxlength='200' id='projects_res_rpc_add'/>" +
                        "<input class='sidepanel-input' type='text' placeholder='Overtime Allowed' maxlength='200' id='projects_res_otall_add'/>" +
                        "<input class='sidepanel-input' type='text' placeholder='Overtime Rate' maxlength='200' id='projects_res_otr_add'/>" +
                        "<input class='sidepanel-input' type='text' placeholder='Resource Role' maxlength='200' id='projects_res_role_add'/>" +
                        "<button class='sidepanel-button' onclick='submit_new_proj_res()'>Submit</button>" +
                    "</div>"
                ).removeClass('none').addClass('display');
                $('#project_res_add').append(resList);
                    // $('#project_res_flex').flexReload();
                
            }
        });
        

    }
    else if (com==='Edit')
    {
        // $('#add_product').click();


        if ($('.trSelected',grid).length>0) {

            var items = $('.trSelected',grid);
            var itemlist = items[0].id.substr(3);
            // alert(itemlist);

            $.ajax({
                url: 'get_edit_res_projects.php',
                type: 'POST',
                data: {
                    id: itemlist,
                },
                error: (e)=>{
                    console.log(e);
                },
                success: (responseEdit)=>{
                    if (responseEdit.success){
                        $.ajax({
                            url: 'get_res_list.php',
                            type: 'POST',
                            data:{
                                id: projID_res
                            },
                            error: (e)=>{
                                console.error(e);
                            },
                            success: (response)=>{
                                    // jAlert(response.message, "S");
                                let resList = "<option disabled selected value> -- select an option -- </option>";
                                response.forEach(item =>{ // Append the value and option name
                                    resList += `<option value="${item.id}">${item.title}</option>`;
                                });
                
                                $('#project_res_flex_form').empty().html(
                                    "<div class='sidepanel-contents'>" +
                                        "<h3 class='sidepanel-title'>Edit Project Resources</h3>" +
                                        // "<select class='sidepanel-select' id='project_res_edit'></select>" +
                                        "<input class='sidepanel-input' type='hidden' placeholder='ID' maxlength='200' id='projects_res_id_edit'/>" +
                                        "Hourly Rate<input class='sidepanel-input' type='text' placeholder='Hourly Rate' maxlength='200' id='projects_res_hrate_edit'/>" +
                                        "Estimated Effort<input class='sidepanel-input' type='text' placeholder='Estimate Effort' maxlength='200' id='projects_res_eseff_edit'/>" +
                                        "Actual Effort<input class='sidepanel-input' type='text' placeholder='Actual Effort' maxlength='200' id='projects_res_aceff_edit'/>" +
                                        "Relative Percentage Completed<input class='sidepanel-input' type='text' placeholder='Relative Percentage Completed' maxlength='200' id='projects_res_rpc_edit'/>" +
                                        "Overtime Allowed<input class='sidepanel-input' type='text' placeholder='Overtime Allowed' maxlength='200' id='projects_res_otall_edit'/>" +
                                        "Overtime Rate<input class='sidepanel-input' type='text' placeholder='Overtime Rate' maxlength='200' id='projects_res_otr_edit'/>" +
                                        "Resource Role<input class='sidepanel-input' type='text' placeholder='Resource Role' maxlength='200' id='projects_res_role_edit'/>" +
                                        "<button class='sidepanel-button' onclick='submit_edit_proj_res()'>Submit</button>" +
                                    "</div>"
                                ).removeClass('none').addClass('display');
                                // alert(responseEdit.data.res);
                                // $('#project_res_edit').append(resList).val(responseEdit.data.res);
                                $('#projects_res_id_edit').val(responseEdit.data.id);
                                $('#projects_res_hrate_edit').val(responseEdit.data.hrate);
                                $('#projects_res_eseff_edit').val(responseEdit.data.eseff);
                                $('#projects_res_aceff_edit').val(responseEdit.data.aceff);
                                $('#projects_res_rpc_edit').val(responseEdit.data.rpc);
                                $('#projects_res_otall_edit').val(responseEdit.data.otall);
                                $('#projects_res_otr_edit').val(responseEdit.data.otr);
                                $('#projects_res_role_edit').val(responseEdit.data.role);
                            }
                        });
                    }
                }
            });


        } else {
            jAlert("Select one item", "E");
        }
    }
}

function submit_new_proj_res(){
    let res = $('#project_res_add').val();
    let hrate = $('#projects_res_hrate_add').val();
    let eseff = $('#projects_res_eseff_add').val();
    let aceff = $('#projects_res_aceff_add').val();
    let rpc = $('#projects_res_rpc_add').val();
    let otall = $('#projects_res_otall_add').val();
    let otr = $('#projects_res_otr_add').val();
    let role = $('#projects_res_role_add').val();

    $.ajax({
        url: 'add_new_project_res.php',
        type: "POST",
        data: {
            id: projID_res,
            res: res,
            hrate: hrate,
            eseff: eseff,
            aceff: aceff,
            rpc: rpc,
            otall: otall,
            otr: otr,
            role: role
        },
        error: (e)=>{
            console.log(e);
        },
        success: (response)=>{
            if (response.success) {
                jAlert(response.message, "S");
                // Flex Reload
                $('#project_res_flex').flexReload();
                $('#project_res_flex_form').removeClass('display').addClass('none').empty();
            } else {
                jAlert(response.message, "E");
            }
        }
    });
}

function submit_edit_proj_res(){
    let id = $('#projects_res_id_edit').val();
    // let res = $('#project_res_edit').val();
    let hrate = $('#projects_res_hrate_edit').val();
    let eseff = $('#projects_res_eseff_edit').val();
    let aceff = $('#projects_res_aceff_edit').val();
    let rpc = $('#projects_res_rpc_edit').val();
    let otall = $('#projects_res_otall_edit').val();
    let otr = $('#projects_res_otr_edit').val();
    let role = $('#projects_res_role_edit').val();

    $.ajax({
        url: 'edit_project_res.php',
        type: "POST",
        data: {
            id: id,
            hrate: hrate,
            eseff: eseff,
            aceff: aceff,
            rpc: rpc,
            otall: otall,
            otr: otr,
            role: role
        },
        error: (e)=>{
            console.log(e);
        },
        success: (response)=>{
            if (response.success) {
                jAlert(response.message, "S");
                // Flex Reload
                $('#project_res_flex').flexReload();
                $('#project_res_flex_form').removeClass('display').addClass('none').empty();
            } else {
                jAlert(response.message, "E");
            }
        }
    });
}
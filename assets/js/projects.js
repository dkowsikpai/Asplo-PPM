let custList = "<option disabled selected value> -- select an option -- </option>";
let pmList = "<option disabled selected value> -- select an option -- </option>";
let statusList = "<option disabled selected value> -- select an option -- </option>";

$(document).ready(function() {

    $.ajax({
        url: 'get_proj_cust_pm_list.php',
        type: 'POST',
        error: (e)=>{
            console.error(e);
        },
        success: (response)=>{
                // jAlert(response.message, "S");
            response.customer.forEach(item =>{ // Append the value and option name
                custList += `<option value="${item.id}">${item.title}</option>`;
            });
            response.pm.forEach(item =>{ // Append the value and option name
                pmList += `<option value="${item.id}">${item.title}</option>`;
            });
            statusList += `<option value='0'>Not Started Yet</option>`;
            statusList += `<option value='1'>Development</option>`;
            statusList += `<option value='2'>Testing</option>`;
            statusList += `<option value='3'>Alpha</option>`;
            statusList += `<option value='4'>Beta</option>`;
            statusList += `<option value='5'>Production Release</option>`;
            statusList += `<option value='6'>Completed</option>`;
            statusList += `<option value='7'>Maintanance</option>`; 
            
            
            $("#projects_flex").flexigrid
            ({
                    url: 'projects.php',
                    dataType: 'json',
                    colModel : [
                        {display: 'ID', name : 'id', width : 80, sortable : true, align: 'center', hide: true},
                        {display: 'Title', name : 'Title', width : 250, sortable : true, align: 'left'},
                        {display: 'Status', name : 'stat', width : 150, sortable : true, align: 'left'},
                        {display: 'Estimated Effort', name : 'estimated_effort', width : 250, sortable : true, align: 'left'},
                        {display: 'Estimated Cost', name : 'estimated_cost', width : 200, sortable : true, align: 'left'},
                        {display: 'Percentage Completed', name : 'pCompleted', width : 500, sortable : false, align: 'left'},
                        {display: 'Start Date', name : 'Start_Date', width : 500, sortable : false, align: 'left', hide: true},
                        {display: 'Finish Date', name : 'Finish_Date', width : 200, sortable : false, align: 'left', hide: true},
                        {display: 'Description', name : 'description', width : 200, sortable : false, align: 'left', hide: true},
                        {display: 'Customer Name', name : 'cuName', width : 200, sortable : false, align: 'left', hide: true},
                        {display: 'Project Manager', name : 'pmName', width : 200, sortable : false, align: 'left', hide: true},
                    ],
                    buttons : [
                        {name: 'Add', bclass: 'add', onpress : Projects_Grid_Actions},
                        {name: 'Edit', bclass: 'edit', onpress : Projects_Grid_Actions},
                        {name: 'Delete', bclass: 'delete', onpress : Projects_Grid_Actions},
                        {name: 'Technology', bclass: 'technology', onpress : Projects_Grid_Actions},
                        {name: 'Resources', bclass: 'resource', onpress : Projects_Grid_Actions},
                        {name: 'Transaction', bclass: 'transaction', onpress : Projects_Grid_Actions},
                        {name: 'Excel Export', bclass: 'excel', onpress : Projects_Grid_Actions},
                        {separator: true}
                    ],
                    searchitems : [
                        {display: 'Title', name : 'Title', isdefault: true},
                        {display: 'Description', name : 'description'},
                        // {display: 'Start Date', name : 'Start_Date'},
                        // {display: 'Finish Date', name : 'Finish_Date'},
                        // {display: 'Customer Name', name : 'cuName'},
                        // {display: 'Project Manager', name : 'pmName'},
                    ],
                    sortname: "Title",
                    sortorder: "asc",
                    usepager: true,
                    title: 'Projects',
                    useRp: true,
                    rp: 15,
                    showTableToggleBtn: false,
                    width: 800,
                    height: 400,
                    singleSelect: true

                }
            );
        }
    });
});

function Projects_Grid_Actions(com,grid)
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
                            url: 'delete_projects.php',
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
                                    $('#projects_flex').flexReload();
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
    else if (com==='Technology')
    {

        if ($('.trSelected',grid).length>0) {

            var items = $('.trSelected', grid);
            var itemlist = items[0].id.substr(3);
            // alert(itemlist);
            $('#sidepanel_projects_contents').empty().html(
                '<table class="flex-grid-div" id="project_technology_flex" style="display:none"></table>' + 
                '<div class="side-panel-bottom-div none" id="project_technology_flex_form"></div>'
            );
            $('#sidepanel_projects').removeClass('hide').addClass('show');
            project_technology_flex_load(itemlist);
                
        } else {
            jAlert('Record Not Selected!', 'E');
        }
    }
    else if (com==='Resources')
    {

        if ($('.trSelected',grid).length>0) {

            var items = $('.trSelected', grid);
            var itemlist = items[0].id.substr(3);
            // alert(itemlist);
            $('#sidepanel_projects_contents').empty().html(
                '<table class="flex-grid-div" id="project_res_flex" style="display:none"></table>' + 
                '<div class="side-panel-bottom-div none" id="project_res_flex_form"></div>'
            );
            $('#sidepanel_projects').removeClass('hide').addClass('show');
            project_res_flex_load(itemlist);
                
        } else {
            jAlert('Record Not Selected!', 'E');
        }
    }
    else if (com==='Transaction')
    {

        if ($('.trSelected',grid).length>0) {

            var items = $('.trSelected', grid);
            var itemlist = items[0].id.substr(3);
            // alert(itemlist);
            $('#sidepanel_projects_contents').empty().html(
                '<table class="flex-grid-div" id="project_tr_flex" style="display:none"></table>' + 
                '<div class="side-panel-bottom-div none" id="project_tr_flex_form"></div>'
            );
            $('#sidepanel_projects').removeClass('hide').addClass('show');
            project_tr_flex_load(itemlist);
                
        } else {
            jAlert('Record Not Selected!', 'E');
        }
    }
     else if (com==='Add')
    {
        $('#sidepanel_projects_contents').empty().html(
            "<div class='sidepanel-contents'>" +
                "<h3 class='sidepanel-title'>Add Projects</h3>" +
                "<input class='sidepanel-input' type='text' placeholder='Title' maxlength='200' id='projects_title_add'/>" +
                "<input class='sidepanel-input' type='text' placeholder='Description' maxlength='300' id='projects_desc_add'/>" +
                "<label class='sidepanel-label' for='projects_customer_add'>Customer:</label><br/>" +
                "<select class='sidepanel-select' id='projects_customer_add'></select>" +
                "<label class='sidepanel-label' for='projects_pm_add'>Project Manager:</label><br/>" +
                "<select class='sidepanel-select' id='projects_pm_add'></select>" +
                "<label class='sidepanel-label' for='projects_status_add'>Status:</label><br/>" +
                "<select class='sidepanel-select' id='projects_status_add'></select>" +
                "<input class='sidepanel-input' type='text' placeholder='Estimated Effort' maxlength='200' id='projects_eff_add'/>" +
                "<input class='sidepanel-input' type='text' placeholder='Estimated Cost' maxlength='200' id='projects_cost_add'/>" +
                "<input class='sidepanel-input' type='number' placeholder='Percentage Completed' maxlength='100' id='projects_per_add'/>" +
                "<input class='sidepanel-input' type='date' placeholder='Start Date' maxlength='300' id='projects_stdate_add'/>" +
                "<input class='sidepanel-input' type='date' placeholder='Finish Date' maxlength='300' id='projects_fidate_add'/>" +
                "<button class='sidepanel-button' onclick='submit_new_projects()'>Submit</button>" +
            "</div>"
        );
        $('#projects_status_add').append(statusList);
        $('#projects_pm_add').append(pmList);
        $('#projects_customer_add').append(custList);
        $('#sidepanel_projects').removeClass('hide').addClass('show');
        

    }
    else if (com==='Edit')
    {
        // $('#add_product').click();


        if ($('.trSelected',grid).length>0) {

            var items = $('.trSelected',grid);
            var itemlist = items[0].id.substr(3);
            // alert(itemlist);

            $.ajax({
                url: 'get_edit_details_projects.php',
                type: 'POST',
                data: {
                    id: itemlist,
                },
                error: (e)=>{
                    console.log(e);
                },
                success: (response)=>{
                    if (response.success){
                        $('#sidepanel_projects_contents').empty().html(
                            "<div class='sidepanel-contents'>" +
                                "<h3 class='sidepanel-title'>Edit Project</h3>" +
                                "<input type='hidden' placeholder='ID' maxlength='200' id='projects_id_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Title' maxlength='200' id='projects_title_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Description' maxlength='300' id='projects_desc_edit'/>" +
                                "<label class='sidepanel-label' for='projects_customer_edit'>Customer:</label><br/>" +
                                "<select class='sidepanel-select' id='projects_customer_edit'></select>" +
                                "<label class='sidepanel-label' for='projects_pm_edit'>Project Manager:</label><br/>" +
                                "<select class='sidepanel-select' id='projects_pm_edit'></select>" +
                                "<label class='sidepanel-label' for='projects_status_edit'>Status:</label><br/>" +
                                "<select class='sidepanel-select' id='projects_status_edit'></select>" +
                                "<input class='sidepanel-input' type='text' placeholder='Estimated Effort' maxlength='200' id='projects_eff_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Estimated Cost' maxlength='200' id='projects_cost_edit'/>" +
                                "<input class='sidepanel-input' type='number' placeholder='Percentage Completed' maxlength='100' id='projects_per_edit'/>" +
                                "<input class='sidepanel-input' type='date' placeholder='Start Date' maxlength='300' id='projects_stdate_edit'/>" +
                                "<input class='sidepanel-input' type='date' placeholder='Finish Date' maxlength='300' id='projects_fidate_edit'/>" +
                                "<button class='sidepanel-button' onclick='submit_edit_projects()'>Submit</button>" +
                            "</div>"
                        );
                        // Set Data
                        $('#projects_status_edit').append(statusList).val(response.data.status);
                        $('#projects_pm_edit').append(pmList).val(response.data.pm);
                        $('#projects_customer_edit').append(custList).val(response.data.cust);
                        $('#projects_id_edit').val(response.data.id);
                        $('#projects_title_edit').val(response.data.title);
                        $('#projects_desc_edit').val(response.data.desc);
                        $('#projects_eff_edit').val(response.data.eff);
                        $('#projects_cost_edit').val(response.data.cost);
                        $('#projects_per_edit').val(response.data.pert);
                        $('#projects_stdate_edit').val(response.data.stdate);
                        $('#projects_fidate_edit').val(response.data.fidate);
                        $('#sidepanel_projects').removeClass('hide').addClass('show');                    }
                }
            });


        } else {
            jAlert("Select one item", "E");
        }
    } else if (com==='Excel Export')
    {
        // $('#add_product').click();


        // if ($('.trSelected',grid).length>0) {

        //     let items = $('.trSelected',grid);
        //     // console.log(items);
        //     let itemlist = items[0].id.substr(3);
        //     // alert(itemlist);


            // get userdata and html inside modal
            window.open('projects_export.php', "_blank");


        // } else {
        //     jAlert("Select one item", "E");
        // }
    }
}

function submit_new_projects(){
    let title = $('#projects_title_add').val();
    let desc = $('#projects_desc_add').val();
    let cust = $('#projects_customer_add').val();
    let pm = $('#projects_pm_add').val();
    let status = $('#projects_status_add').val();
    let eff = $('#projects_eff_add').val();
    let cost = $('#projects_cost_add').val();
    let pert = $('#projects_per_add').val();
    let stdate = $('#projects_stdate_add').val();
    let fidate = $('#projects_fidate_add').val();

    
    $.ajax({
        url: 'add_new_project.php',
        type: 'POST',
        data: {
            title: title,
            desc: desc,
            cust: cust,
            pm: pm,
            status: status,
            eff: eff,
            cost: cost,
            pert: pert,
            stdate: stdate,
            fidate: fidate
        },
        error: (e)=>{
            console.error(e);
        },
        success: (response)=>{
            if (response.success) {
                jAlert(response.message, "S");
                // Flex Reload
                $('#projects_flex').flexReload();
                $('#sidepanel_projects').removeClass('show').addClass('hide');
            } else {
                jAlert(response.message, "E");
            }
        }
    });


}

function submit_edit_projects(){
    let id = $('#projects_id_edit').val();
    let title = $('#projects_title_edit').val();
    let desc = $('#projects_desc_edit').val();
    let cust = $('#projects_customer_edit').val();
    let pm = $('#projects_pm_edit').val();
    let status = $('#projects_status_edit').val();
    let eff = $('#projects_eff_edit').val();
    let cost = $('#projects_cost_edit').val();
    let pert = $('#projects_per_edit').val();
    let stdate = $('#projects_stdate_edit').val();
    let fidate = $('#projects_fidate_edit').val();

    
    $.ajax({
        url: 'edit_projects.php',
        type: 'POST',
        data: {
            id: id,
            title: title,
            desc: desc,
            cust: cust,
            pm: pm,
            status: status,
            eff: eff,
            cost: cost,
            pert: pert,
            stdate: stdate,
            fidate: fidate
        },
        error: (e)=>{
            console.error(e);
        },
        success: (response)=>{
            if (response.success) {
                jAlert(response.message, "S");
                // Flex Reload
                $('#projects_flex').flexReload();
                $('#sidepanel_projects').removeClass('show').addClass('hide');
            } else {
                jAlert(response.message, "E");
            }
        }
    });


}


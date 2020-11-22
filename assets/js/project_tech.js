let projID = -1;
function project_technology_flex_load(itemlist) {
    projID = itemlist;
    $("#project_technology_flex").flexigrid
    ({
            url: 'project_tech.php',
            dataType: 'json',
            colModel : [
                {display: 'ID', name : 'id', width : 80, sortable : true, align: 'center', hide: true},
                {display: 'TechID', name : 'techid', width : 80, sortable : true, align: 'left', hide: true},
                {display: 'PID', name : 'pid', width : 80, sortable : true, align: 'left', hide: true},
                {display: 'Technology', name : 'name', width : 150, sortable : true, align: 'left'},
                {display: 'Version', name : 'version', width : 150, sortable : true, align: 'left'}
            ],
            buttons : [
                {name: 'Add', bclass: 'add', onpress : Tech_Grid_Actions},
                {name: 'Delete', bclass: 'delete', onpress : Tech_Grid_Actions},
                {separator: true}
            ],
            searchitems : [
                {display: 'Technology', name : 'name', isdefault: true},
                {display: 'Version', name : 'version'}
            ],
            sortname: "name",
            sortorder: "asc",
            usepager: true,
            title: 'Technology',
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

function Tech_Grid_Actions(com,grid)
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
                            url: 'delete_proj_tech.php',
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
                                    $('#project_technology_flex').flexReload();
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
            url: 'get_tech_list.php',
            type: 'POST',
            data:{
                id: projID
            },
            error: (e)=>{
                console.error(e);
            },
            success: (response)=>{
                    // jAlert(response.message, "S");
                let techList = "<option disabled selected value> -- select an option -- </option>";
                response.forEach(item =>{ // Append the value and option name
                    techList += `<option value="${item.id}">${item.title}</option>`;
                });
                // Flex Reload
                $('#project_technology_flex_form').empty().html(
                    "<div class='sidepanel-contents'>" +
                        "<h3 class='sidepanel-title'>Add Project Technology</h3>" +
                        "<select class='sidepanel-select' id='project_tech_add'></select>" +
                        "<button class='sidepanel-button' onclick='submit_new_proj_tech()'>Submit</button>" +
                    "</div>"
                ).removeClass('none').addClass('display');
                $('#project_tech_add').append(techList);
                    // $('#project_technology_flex').flexReload();
                
            }
        });
        

    }
}


function submit_new_proj_tech(){
    let tech = $('#project_tech_add').val();

    $.ajax({
        url: 'add_new_project_tech.php',
        type: "POST",
        data: {
            id: projID,
            tech: tech
        },
        error: (e)=>{
            console.log(e);
        },
        success: (response)=>{
            if (response.success) {
                jAlert(response.message, "S");
                // Flex Reload
                $('#project_technology_flex').flexReload();
                $('#project_technology_flex_form').removeClass('display').addClass('none').empty();
            } else {
                jAlert(response.message, "E");
            }
        }
    });
}
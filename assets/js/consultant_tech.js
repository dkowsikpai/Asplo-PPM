let custID = -1;
function technology_flex_load(itemlist) {
    custID = itemlist;
    $("#technology_flex").flexigrid
    ({
            url: 'consultant_tech.php?',
            dataType: 'json',
            colModel : [
                {display: 'ID', name : 'id', width : 80, sortable : true, align: 'center', hide: true},
                {display: 'TechID', name : 'techid', width : 80, sortable : true, align: 'left', hide: true},
                {display: 'CID', name : 'cid', width : 80, sortable : true, align: 'left', hide: true},
                {display: 'Technology', name : 'name', width : 150, sortable : true, align: 'left'},
                {display: 'Version', name : 'cid', width : 150, sortable : true, align: 'left'}
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
                            url: 'delete_cust_tech.php',
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
                                    $('#technology_flex').flexReload();
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
                $('#technology_flex_form').empty().html(
                    "<div class='sidepanel-contents'>" +
                        "<h3 class='sidepanel-title'>Add Technology</h3>" +
                        "<select class='sidepanel-select' id='consultant_tech_add'></select>" +
                        "<button class='sidepanel-button' onclick='submit_new_tech()'>Submit</button>" +
                    "</div>"
                ).removeClass('none').addClass('display');
                $('#consultant_tech_add').append(techList);
                    // $('#technology_flex').flexReload();
                
            }
        });
        

    }
}


function submit_new_tech(){
    let tech = $('#consultant_tech_add').val();

    $.ajax({
        url: 'add_new_consultatnt_tech.php',
        type: "POST",
        data: {
            id: custID,
            tech: tech
        },
        error: (e)=>{
            console.log(e);
        },
        success: (response)=>{
            if (response.success) {
                jAlert(response.message, "S");
                // Flex Reload
                $('#technology_flex').flexReload();
                $('#technology_flex_form').removeClass('display').addClass('none').empty();
            } else {
                jAlert(response.message, "E");
            }
        }
    });
}
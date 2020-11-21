$(document).ready(function() {
    $("#tech_flex").flexigrid
    ({
            url: 'technologies.php',
            dataType: 'json',
            colModel : [
                {display: 'ID', name : 'ID', width : 80, sortable : true, align: 'center', hide: true},
                {display: 'Technology', name : 'Technology', width : 250, sortable : true, align: 'left'},
                {display: 'Version', name : 'Version', width : 150, sortable : true, align: 'left'},
            ],
            buttons : [
                {name: 'Add', bclass: 'add', onpress : Technology_Grid_Actions},
                {name: 'Edit', bclass: 'edit', onpress : Technology_Grid_Actions},
                {name: 'Delete', bclass: 'delete', onpress : Technology_Grid_Actions},
                {separator: true}
            ],
            searchitems : [
                {display: 'Technology', name : 'Technology', isDefault: true},
                {display: 'Version', name : 'Version'},
            ],
            sortname: "Technology",
            sortorder: "asc",
            usepager: true,
            title: 'Technologies',
            useRp: true,
            rp: 15,
            showTableToggleBtn: false,
            width: 800,
            height: 400,
            singleSelect: true

        }
    );
       
});

function Technology_Grid_Actions(com,grid)
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
                            url: 'delete_technology.php',
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
                                    $('#tech_flex').flexReload();
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
        
        $('#sidepanel_tech_contents').empty().html(
            "<div class='sidepanel-contents'>" +
                "<h3 class='sidepanel-title'>Add Technology</h3>" +
                "<input class='sidepanel-input' type='text' placeholder='Technology' maxlength='200' id='tech_technology_add'/>" +
                "<input class='sidepanel-input' type='text' placeholder='Version' maxlength='12' id='tech_version_add'/>" +
                "<button class='sidepanel-button' onclick='submit_new_tech()'>Submit</button>" +
            "</div>"
        );
        $('#sidepanel_tech').removeClass('hide').addClass('show');

    }
    else if (com==='Edit')
    {
        $('#add_product').click();


        if ($('.trSelected',grid).length>0) {

            var items = $('.trSelected',grid);
            var itemlist = items[0].id.substr(3);
            // alert(itemlist);

            $.ajax({
                url: 'get_edit_details_technology.php',
                type: 'POST',
                data: {
                    id: itemlist,
                },
                error: (e)=>{
                    console.log(e);
                },
                success: (response)=>{
                    if (response.success){
                        $('#sidepanel_tech_contents').empty().html(
                            "<div class='sidepanel-contents'>" +
                                "<h3 class='sidepanel-title'>Edit Technology</h3>" +
                                "<input type='hidden' placeholder='ID' maxlength='200' id='tech_id_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Technology' maxlength='200' id='tech_technology_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Version' maxlength='12' id='tech_version_edit'/>" +
                                "<button class='sidepanel-button' onclick='submit_edit_tech()'>Submit</button>" +
                            "</div>"
                        );
                        // Set Data
                        $('#tech_id_edit').val(response.data.id);
                        $('#tech_technology_edit').val(response.data.technology);
                        $('#tech_version_edit').val(response.data.version);
                        $('#sidepanel_tech').removeClass('hide').addClass('show');
                    }
                }
            });


        } else {
            jAlert("Select one item", "E");
        }
    }
}

function submit_new_tech(){
    let technology = $('#tech_technology_add').val();
    let version = $('#tech_version_add').val();

    $.ajax({
        url: 'add_new_technology.php',
        type: 'POST',
        data: {
            technology: technology,
            version: version
        },
        error: (e)=>{
            console.error(e);
        },
        success: (response)=>{
            if (response.success) {
                jAlert(response.message, "S");
                // Flex Reload
                $('#tech_flex').flexReload();
                $('#sidepanel_tech').removeClass('show').addClass('hide');
            } else {
                jAlert(response.message, "E");
            }
        }
    });


}

function submit_edit_tech(){
    let id = $('#tech_id_edit').val();
    let technology = $('#tech_technology_edit').val();
    let version = $('#tech_version_edit').val();

    $.ajax({
        url: 'edit_technology.php',
        type: 'POST',
        data: {
            id: id,
            technology: technology,
            version: version
        },
        error: (e)=>{
            console.error(e);
        },
        success: (response)=>{
            if (response.success) {
                jAlert(response.message, "S");
                // Flex Reload
                $('#tech_flex').flexReload();
                $('#sidepanel_tech').removeClass('show').addClass('hide');
            } else {
                jAlert(response.message, "E");
            }
        }
    });


}


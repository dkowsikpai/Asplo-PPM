function designation_flex_load() {
    $("#designation_flex").flexigrid
    ({
            url: 'designation.php',
            dataType: 'json',
            colModel : [
                {display: 'ID', name : 'id', width : 80, sortable : true, align: 'center', hide: true},
                {display: 'Designation', name : 'designation', width : 250, sortable : true, align: 'left'},
                {display: 'Grade', name : 'grade', width : 150, sortable : true, align: 'left'}
            ],
            buttons : [
                {name: 'Add', bclass: 'add', onpress : Designation_Grid_Actions},
                {name: 'Edit', bclass: 'edit', onpress : Designation_Grid_Actions},
                {name: 'Delete', bclass: 'delete', onpress : Designation_Grid_Actions},
                {separator: true}
            ],
            searchitems : [
                {display: 'Designation', name : 'designation', isdefault: true},
                {display: 'Grade', name : 'grade'}
            ],
            sortname: "designation",
            sortorder: "asc",
            usepager: true,
            title: 'Designation',
            useRp: true,
            rp: 15,
            showTableToggleBtn: false,
            width: 600,
            height: 300,
            singleSelect: true

        }
    );
};

function Designation_Grid_Actions(com,grid)
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
                            url: 'delete_designation.php',
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
                                    $('#designation_flex').flexReload();
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
        
        $('#desgnation_flex_form').empty().html(
            "<div class='sidepanel-contents'>" +
                "<h3 class='sidepanel-title'>Add Designation</h3>" +
                "<input class='sidepanel-input' type='text' placeholder='Designation' maxlength='200' id='designation_designation_add'/>" +
                "<input class='sidepanel-input' type='number' placeholder='Grade' maxlength='12' id='designation_grade_add'/>" +
                "<button class='sidepanel-button' onclick='submit_new_designation()'>Submit</button>" +
            "</div>"
        ).removeClass('none').addClass('display');

    }
    else if (com==='Edit')
    {
        // $('#add_product').click();


        if ($('.trSelected',grid).length>0) {

            var items = $('.trSelected',grid);
            var itemlist = items[0].id.substr(3);
            // alert(itemlist);

            $.ajax({
                url: 'get_edit_details_designation.php',
                type: 'POST',
                data: {
                    id: itemlist,
                },
                error: (e)=>{
                    console.log(e);
                },
                success: (response)=>{
                    if (response.success){
                        $('#desgnation_flex_form').empty().html(
                            "<div class='sidepanel-contents'>" +
                                "<h3 class='sidepanel-title'>Edit Designation</h3>" +
                                "<input class='sidepanel-input' type='hidden' placeholder='ID' maxlength='200' id='designation_id_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Designation' maxlength='200' id='designation_designation_edit'/>" +
                                "<input class='sidepanel-input' type='number' placeholder='Grade' maxlength='12' id='designation_grade_edit'/>" +
                                "<button class='sidepanel-button' onclick='submit_edit_designation()'>Submit</button>" +
                            "</div>"
                        );
                        $('#designation_id_edit').val(response.data.id);
                        $('#designation_designation_edit').val(response.data.designation);
                        $('#designation_grade_edit').val(response.data.grade);
                        $('#desgnation_flex_form').removeClass('none').addClass('display');
                    }
                }
            });


        } else {
            jAlert("Select one item", "E");
        }
    }
}


function submit_new_designation(){
    let designation = $('#designation_designation_add').val();
    let grade = $('#designation_grade_add').val();

    $.ajax({
        url: 'add_new_designation.php',
        type: "POST",
        data: {
            designation: designation,
            grade: grade
        },
        error: (e)=>{
            console.log(e);
        },
        success: (response)=>{
            if (response.success) {
                jAlert(response.message, "S");
                // Flex Reload
                $('#designation_flex').flexReload();
                $('#desgnation_flex_form').removeClass('display').addClass('none').empty();
            } else {
                jAlert(response.message, "E");
            }
        }
    });
}

function submit_edit_designation(){
    let id = $('#designation_id_edit').val();
    let designation = $('#designation_designation_edit').val();
    let grade = $('#designation_grade_edit').val();

    $.ajax({
        url: 'edit_designation.php',
        type: "POST",
        data: {
            id: id,
            designation: designation,
            grade: grade
        },
        error: (e)=>{
            console.log(e);
        },
        success: (response)=>{
            if (response.success) {
                jAlert(response.message, "S");
                // Flex Reload
                $('#designation_flex').flexReload();
                $('#desgnation_flex_form').removeClass('display').addClass('none').empty();
            } else {
                jAlert(response.message, "E");
            }
        }
    });
}

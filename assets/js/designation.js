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

        // if ($('.trSelected',grid).length>0) {
        //     jConfirm('<b>Action cannot be reverted ! </b> Confirm...', '', function(user_act) {
        //         if (user_act) {

        //             if ($('.trSelected',grid).length>0) {

        //                 var items = $('.trSelected', grid);
        //                 var itemlist = items[0].id.substr(3);
        //                 // alert(itemlist);
        //                 $.ajax({
        //                     url: 'delete_consultant.php',
        //                     type: 'POST',
        //                     data: {
        //                         id: itemlist
        //                     },
        //                     error: (e)=>{
        //                         console.error(e);
        //                     },
        //                     success: (response)=>{
        //                         if (response.success) {
        //                             jAlert(response.message, "S");
        //                             // Flex Reload
        //                             $('#designation_flex').flexReload();
        //                         } else {
        //                             jAlert(response.message, "E");
        //                         }
        //                     }
        //                 });
                        
        //             }
        //         } else {
        //             return false;
        //         }
        //     });
        // } else {
        //     jAlert('Record Not Selected!', 'E');
        // }
    }
    else if (com==='Add')
    {
        $('#sidepanel_second_consultants').removeClass('hide').addClass('show');
        // $('#sidepanel_consultants_contents').empty().html(
        //     "<div class='sidepanel-contents'>" +
        //         "<h3 class='sidepanel-title'>Add Consultant</h3>" +
        //         "<input class='sidepanel-input' type='text' placeholder='Name' maxlength='200' id='consultant_name_add'/>" +
        //         "<input class='sidepanel-input' type='text' placeholder='Phone' maxlength='12' id='consultant_phone_add'/>" +
        //         "<input class='sidepanel-input' type='email' placeholder='Email' maxlength='200' id='consultant_email_add'/>" +
        //         "<input class='sidepanel-input' type='number' placeholder='Experience' maxlength='200' id='consultant_experience_add'/>" +
        //         "<input class='sidepanel-input' type='text' placeholder='Highest Educational Qualification' maxlength='200' id='consultant_edu_add'/>" +
        //         "<input class='sidepanel-input' type='text' placeholder='Present Address' maxlength='300' id='consultant_presentAddress_add'/>" +
        //         "<input class='sidepanel-input' type='text' placeholder='Permanent Address' maxlength='300' id='consultant_pAddress_add'/>" +
        //         "<label class='sidepanel-label' for='consultant_designation_add'>Designation:</label><br/>" +
        //         "<select class='sidepanel-select' id='consultant_designation_add'></select>" +
        //         "<button class='sidepanel-button' onclick='submit_new_consultant()'>Submit</button>" +
        //     "</div>"
        // );
        // $('#consultant_designation_add').append(designationList);
        // $('#sidepanel_consultants').removeClass('hide').addClass('show');

    }
    else if (com==='Edit')
    {
        // $('#add_product').click();


        // if ($('.trSelected',grid).length>0) {

        //     var items = $('.trSelected',grid);
        //     var itemlist = items[0].id.substr(3);
        //     // alert(itemlist);

        //     $.ajax({
        //         url: 'get_edit_details_consultant.php',
        //         type: 'POST',
        //         data: {
        //             id: itemlist,
        //         },
        //         error: (e)=>{
        //             console.log(e);
        //         },
        //         success: (response)=>{
        //             if (response.success){
        //                 $('#sidepanel_consultants_contents').empty().html(
        //                     "<div class='sidepanel-contents'>" +
        //                         "<h3 class='sidepanel-title'>Edit Consultant</h3>" +
        //                         "<input type='hidden' placeholder='ID' maxlength='200' id='consultant_id_edit'/>" +
        //                         "<input class='sidepanel-input' type='text' placeholder='Name' maxlength='200' id='consultant_name_edit'/>" +
        //                         "<input class='sidepanel-input' type='text' placeholder='Phone' maxlength='12' id='consultant_phone_edit'/>" +
        //                         "<input class='sidepanel-input' type='email' placeholder='Email' maxlength='200' id='consultant_email_edit'/>" +
        //                         "<input class='sidepanel-input' type='number' placeholder='Experience' maxlength='200' id='consultant_experience_edit'/>" +
        //                         "<input class='sidepanel-input' type='text' placeholder='Highest Educational Qualification' maxlength='200' id='consultant_edu_edit'/>" +
        //                         "<input class='sidepanel-input' type='text' placeholder='Present Address' maxlength='300' id='consultant_presentAddress_edit'/>" +
        //                         "<input class='sidepanel-input' type='text' placeholder='Permanent Address' maxlength='300' id='consultant_pAddress_edit'/>" +
        //                         "<label class='sidepanel-label' for='consultant_designation_edit'>Designation:</label><br/>" +
        //                         "<select class='sidepanel-select' id='consultant_designation_edit'></select>" +
        //                         "<button class='sidepanel-button' onclick='submit_edit_consultant()'>Submit</button>" +
        //                     "</div>"
        //                 );
        //                 $('#consultant_designation_edit').append(designationList);
        //                 // Set Data
        //                 $('#consultant_id_edit').val(response.data.id);
        //                 $('#consultant_name_edit').val(response.data.name);
        //                 $('#consultant_phone_edit').val(response.data.phone);
        //                 $('#consultant_email_edit').val(response.data.email);
        //                 $('#consultant_presentAddress_edit').val(response.data.presentAddress);
        //                 $('#consultant_pAddress_edit').val(response.data.pAddress);
        //                 $('#consultant_experience_edit').val(response.data.experience);
        //                 $('#consultant_edu_edit').val(response.data.edu);
        //                 $('#consultant_designation_edit').val(response.data.designation);
        //                 $('#sidepanel_consultants').removeClass('hide').addClass('show');
        //             }
        //         }
        //     });


        // } else {
        //     jAlert("Select one item", "E");
        // }
    }
}




let designationList = "<option disabled selected value> -- select an option -- </option>";
$(document).ready(function() {
    $.ajax({
        url: 'designation_list.php',
        type: "POST",
        error: (e)=>{
            console.error(e);
        },
        success: (response)=>{
            // Prepare  the list of designation of dropdown
            response.forEach(item =>{ // Append the value and option name
                designationList += `<option value="${item.id}">${item.designation}</option>`;
            });
            // console.log(designationList);

            $("#consultant_flex").flexigrid
            ({
                    url: 'consultants.php',
                    dataType: 'json',
                    colModel : [
                        {display: 'ID', name : 'id', width : 80, sortable : true, align: 'center', hide: true},
                        {display: 'Name', name : 'name', width : 250, sortable : true, align: 'left'},
                        {display: 'Phone', name : 'phone', width : 150, sortable : true, align: 'left'},
                        {display: 'Email', name : 'email', width : 250, sortable : true, align: 'left'},
                        {display: 'Designation', name : 'designation', width : 200, sortable : true, align: 'left'},
                        {display: 'Present Address', name : 'presentAddress', width : 500, sortable : false, align: 'left'},
                        {display: 'Permanent Address', name : 'pAddress', width : 500, sortable : false, align: 'left', hide: true},
                        {display: 'Experience', name : 'experience', width : 200, sortable : false, align: 'left', hide: true},
                        {display: 'Highest Education Qualification', name : 'highest_edu', width : 300, sortable : false, align: 'left', hide: true},
                    ],
                    buttons : [
                        {name: 'Add', bclass: 'add', onpress : test},
                        {name: 'Edit', bclass: 'edit', onpress : test},
                        {name: 'Delete', bclass: 'delete', onpress : test},
                        {separator: true}
                    ],
                    searchitems : [
                        {display: 'Name', name : 'name', isdefault: true},
                        {display: 'Phone', name : 'phone'},
                        {display: 'Email', name : 'email'},
                        {display: 'Designation', name : 'designation'},
                        {display: 'Present Address', name : 'presentAddress'},
                        {display: 'Permanent Address', name : 'pAddress'},
                    ],
                    sortname: "name",
                    sortorder: "asc",
                    usepager: true,
                    title: 'Consultants',
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

function test(com,grid)
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
        
        $('#sidepanel_consultants_contents').empty().html(
            "<div class='sidepanel-contents'>" +
                "<h3 class='sidepanel-title'>Add Consultant</h3>" +
                "<input class='sidepanel-input' type='text' placeholder='Name' maxlength='200' id='consultant_name_add'/>" +
                "<input class='sidepanel-input' type='text' placeholder='Phone' maxlength='12' id='consultant_phone_add'/>" +
                "<input class='sidepanel-input' type='email' placeholder='Email' maxlength='200' id='consultant_email_add'/>" +
                "<input class='sidepanel-input' type='number' placeholder='Experience' maxlength='200' id='consultant_experience_add'/>" +
                "<input class='sidepanel-input' type='text' placeholder='Highest Educational Qualification' maxlength='200' id='consultant_edu_add'/>" +
                "<input class='sidepanel-input' type='text' placeholder='Present Address' maxlength='300' id='consultant_presentAddress_add'/>" +
                "<input class='sidepanel-input' type='text' placeholder='Permanent Address' maxlength='300' id='consultant_pAddress_add'/>" +
                "<label class='sidepanel-label' for='consultant_designation_add'>Designation:</label><br/>" +
                "<select class='sidepanel-select' id='consultant_designation_add'></select>" +
                "<button class='sidepanel-button' onclick='submit_new_consultant()'>Submit</button>" +
            "</div>"
        );
        $('#consultant_designation_add').append(designationList);
        $('#sidepanel_consultants').removeClass('hide').addClass('show');

    }
    else if (com==='Edit')
    {
        // $('#add_product').click();


        if ($('.trSelected',grid).length>0) {

            var items = $('.trSelected',grid);
            var itemlist = items[0].id.substr(3);
            // alert(itemlist);

            $.ajax({
                url: 'get_edit_details_consultant.php',
                type: 'POST',
                data: {
                    id: itemlist,
                },
                error: (e)=>{
                    console.log(e);
                },
                success: (response)=>{
                    if (response.success){
                        $('#sidepanel_consultants_contents').empty().html(
                            "<div class='sidepanel-contents'>" +
                                "<h3 class='sidepanel-title'>Edit Consultant</h3>" +
                                "<input type='hidden' placeholder='ID' maxlength='200' id='consultant_id_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Name' maxlength='200' id='consultant_name_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Phone' maxlength='12' id='consultant_phone_edit'/>" +
                                "<input class='sidepanel-input' type='email' placeholder='Email' maxlength='200' id='consultant_email_edit'/>" +
                                "<input class='sidepanel-input' type='number' placeholder='Experience' maxlength='200' id='consultant_experience_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Highest Educational Qualification' maxlength='200' id='consultant_edu_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Present Address' maxlength='300' id='consultant_presentAddress_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Permanent Address' maxlength='300' id='consultant_pAddress_edit'/>" +
                                "<label class='sidepanel-label' for='consultant_designation_edit'>Designation:</label><br/>" +
                                "<select class='sidepanel-select' id='consultant_designation_edit'></select>" +
                                "<button class='sidepanel-button' onclick='submit_edit_consultant()'>Submit</button>" +
                            "</div>"
                        );
                        $('#consultant_designation_edit').append(designationList);
                        // Set Data
                        $('#consultant_id_edit').val(response.data.id);
                        $('#consultant_name_edit').val(response.data.name);
                        $('#consultant_phone_edit').val(response.data.phone);
                        $('#consultant_email_edit').val(response.data.email);
                        $('#consultant_presentAddress_edit').val(response.data.presentAddress);
                        $('#consultant_pAddress_edit').val(response.data.pAddress);
                        $('#consultant_experience_edit').val(response.data.experience);
                        $('#consultant_edu_edit').val(response.data.edu);
                        $('#consultant_designation_edit').val(response.data.designation);
                        $('#sidepanel_consultants').removeClass('hide').addClass('show');
                    }
                }
            });


        } else {
            jAlert("Select one item", "E");
        }
    }
}

function submit_new_consultant(){
    let name = $('#consultant_name_add').val();
    let phone = $('#consultant_phone_add').val();
    let email = $('#consultant_email_add').val();
    let exp = $('#consultant_experience_add').val();
    let edu = $('#consultant_edu_add').val();
    let presentAddr = $('#consultant_presentAddress_add').val();
    let pAddr = $('#consultant_pAddress_add').val();
    let desig = $('#consultant_designation_add').val();

    $.ajax({
        url: 'add_new_consultant.php',
        type: 'POST',
        data: {
            name: name,
            phone: phone,
            email: email,
            experience: exp,
            edu: edu,
            presentAddr: presentAddr,
            pAddr: pAddr,
            desig: desig
        },
        error: (e)=>{
            console.error(e);
        },
        success: (response)=>{
            if (response.success) {
                jAlert(response.message, "S");
                // Flex Reload
                $('#consultant_flex').flexReload();
                $('#sidepanel_consultants').removeClass('show').addClass('hide');
            } else {
                jAlert(response.message, "E");
            }
        }
    });


}

function submit_edit_consultant(){
    let id = $('#consultant_id_edit').val();
    let name = $('#consultant_name_edit').val();
    let phone = $('#consultant_phone_edit').val();
    let email = $('#consultant_email_edit').val();
    let exp = $('#consultant_experience_edit').val();
    let edu = $('#consultant_edu_edit').val();
    let presentAddr = $('#consultant_presentAddress_edit').val();
    let pAddr = $('#consultant_pAddress_edit').val();
    let desig = $('#consultant_designation_edit').val();

    $.ajax({
        url: 'edit_consultant.php',
        type: 'POST',
        data: {
            id: id,
            name: name,
            phone: phone,
            email: email,
            experience: exp,
            edu: edu,
            presentAddr: presentAddr,
            pAddr: pAddr,
            desig: desig
        },
        error: (e)=>{
            console.error(e);
        },
        success: (response)=>{
            if (response.success) {
                jAlert(response.message, "S");
                // Flex Reload
                $('#consultant_flex').flexReload();
                $('#sidepanel_consultants').removeClass('show').addClass('hide');
            } else {
                jAlert(response.message, "E");
            }
        }
    });


}


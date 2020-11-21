let custID = -1;
function contacts_flex_load(itemlist) {
    custID = itemlist;
    $("#contacts_flex").flexigrid
    ({
            url: 'customers_contact.php',
            dataType: 'json',
            colModel : [
                {display: 'ID', name : 'id', width : 80, sortable : true, align: 'center', hide: true},
                {display: 'Contact Person', name : 'cp', width : 150, sortable : true, align: 'left'},
                {display: 'Phone Number', name : 'phone', width : 150, sortable : true, align: 'left'},
                {display: 'Mobile', name : 'mobile', width : 150, sortable : true, align: 'left'},
                {display: 'Email', name : 'email', width : 150, sortable : true, align: 'left'},
                {display: 'Profile Description', name : 'desc', width : 250, sortable : true, align: 'left'}
            ],
            buttons : [
                {name: 'Add', bclass: 'add', onpress : Contact_Grid_Actions},
                {name: 'Edit', bclass: 'edit', onpress : Contact_Grid_Actions},
                {name: 'Delete', bclass: 'delete', onpress : Contact_Grid_Actions},
                {separator: true}
            ],
            searchitems : [
                {display: 'Contact Person', name : 'cp', isdefault: true},
                {display: 'Phone Number', name : 'phone'},
                {display: 'Mobile', name : 'mobile'},
                {display: 'Email', name : 'email'},
                {display: 'Profile Description', name : 'desc'}
            ],
            sortname: "cp",
            sortorder: "asc",
            usepager: true,
            title: 'Contacts',
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

function Contact_Grid_Actions(com,grid)
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
                            url: 'delete_contacts.php',
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
                                    $('#contacts_flex').flexReload();
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

        $('#contacts_flex_form').empty().html(
            "<div class='sidepanel-contents'>" +
                "<h3 class='sidepanel-title'>Add Contacts</h3>" +
                "<input class='sidepanel-input' type='text' placeholder='Contact Person' maxlength='200' id='contacts_cp_add'/>" +
                "<input class='sidepanel-input' type='text' placeholder='Phone' maxlength='12' id='contacts_phone_add'/>" +
                "<input class='sidepanel-input' type='text' placeholder='Mobile' maxlength='12' id='contacts_mobile_add'/>" +
                "<input class='sidepanel-input' type='email' placeholder='Email' maxlength='200' id='contacts_email_add'/>" +
                "<input class='sidepanel-input' type='text' placeholder='Profile Description' maxlength='200' id='contacts_desc_add'/>" +
                "<button class='sidepanel-button' onclick='submit_new_contact()'>Submit</button>" +
            "</div>"
        ).removeClass('none').addClass('display');
            // $('#contacts_flex').flexReload();
    }
    else if (com==='Edit')
    {
        // $('#add_product').click();


        if ($('.trSelected',grid).length>0) {

            var items = $('.trSelected',grid);
            var itemlist = items[0].id.substr(3);
            // alert(itemlist);

            $.ajax({
                url: 'get_edit_details_contacts.php',
                type: 'POST',
                data: {
                    id: itemlist,
                },
                error: (e)=>{
                    console.log(e);
                },
                success: (response)=>{
                    if (response.success){
                        $('#contacts_flex_form').empty().html(
                            "<div class='sidepanel-contents'>" +
                                "<h3 class='sidepanel-title'>Edit Contacts</h3>" +
                                "<input class='sidepanel-input' type='hidden' placeholder='ID' maxlength='200' id='contacts_id_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Contact Person' maxlength='200' id='contacts_cp_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Phone' maxlength='12' id='contacts_phone_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Mobile' maxlength='12' id='contacts_mobile_edit'/>" +
                                "<input class='sidepanel-input' type='email' placeholder='Email' maxlength='200' id='contacts_email_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Profile Description' maxlength='200' id='contacts_desc_edit'/>" +
                                "<button class='sidepanel-button' onclick='submit_edit_contact()'>Submit</button>" +
                            "</div>"
                        );
                        $('#contacts_id_edit').val(response.data.id);
                        $('#contacts_cp_edit').val(response.data.cp);
                        $('#contacts_phone_edit').val(response.data.phone);
                        $('#contacts_mobile_edit').val(response.data.mobile);
                        $('#contacts_email_edit').val(response.data.email);
                        $('#contacts_desc_edit').val(response.data.desc);
                        $('#contacts_flex_form').removeClass('none').addClass('display');
                    }
                }
            });


        } else {
            jAlert("Select one item", "E");
        }
    }
}


function submit_new_contact(){
    let cp = $('#contacts_cp_add').val();
    let phone = $('#contacts_phone_add').val();
    let mobile = $('#contacts_mobile_add').val();
    let email = $('#contacts_email_add').val();
    let desc = $('#contacts_desc_add').val();

    $.ajax({
        url: 'add_new_customer_contact.php',
        type: "POST",
        data: {
            id: custID,
            cp: cp,
            phone: phone,
            mobile: mobile,
            email: email,
            desc: desc
        },
        error: (e)=>{
            console.log(e);
        },
        success: (response)=>{
            if (response.success) {
                jAlert(response.message, "S");
                // Flex Reload
                $('#contacts_flex').flexReload();
                $('#contacts_flex_form').removeClass('display').addClass('none').empty();
            } else {
                jAlert(response.message, "E");
            }
        }
    });
}

function submit_edit_contact(){
    let ID = $('#contacts_id_edit').val();
    let cp = $('#contacts_cp_edit').val();
    let phone = $('#contacts_phone_edit').val();
    let mobile = $('#contacts_mobile_edit').val();
    let email = $('#contacts_email_edit').val();
    let desc = $('#contacts_desc_edit').val();

    $.ajax({
        url: 'edit_customer_contact.php',
        type: "POST",
        data: {
            id: ID,
            cp: cp,
            phone: phone,
            mobile: mobile,
            email: email,
            desc: desc
        },
        error: (e)=>{
            console.log(e);
        },
        success: (response)=>{
            if (response.success) {
                jAlert(response.message, "S");
                // Flex Reload
                $('#contacts_flex').flexReload();
                $('#contacts_flex_form').removeClass('display').addClass('none').empty();
            } else {
                jAlert(response.message, "E");
            }
        }
    });
}
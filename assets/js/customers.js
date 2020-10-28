$(document).ready(function() {
    $("#customer_flex").flexigrid
    ({
            url: 'customers.php',
            dataType: 'json',
            colModel : [
                {display: 'ID', name : 'id', width : 80, sortable : true, align: 'center', hide: true},
                {display: 'Name', name : 'name', width : 250, sortable : true, align: 'left'},
                {display: 'Phone', name : 'phone', width : 150, sortable : true, align: 'left'},
                {display: 'Email', name : 'email', width : 250, sortable : true, align: 'left'},
                {display: 'Fax', name : 'fax', width : 150, sortable : true, align: 'left'},
                {display: 'Permanent Address', name : 'pAddress', width : 500, sortable : false, align: 'left'},
            ],
            buttons : [
                {name: 'Add', bclass: 'add', onpress : Customer_Grid_Actions},
                {name: 'Edit', bclass: 'edit', onpress : Customer_Grid_Actions},
                {name: 'Delete', bclass: 'delete', onpress : Customer_Grid_Actions},
                {separator: true}
            ],
            searchitems : [
                {display: 'Name', name : 'name', isdefault: true},
                {display: 'Phone', name : 'phone'},
                {display: 'Email', name : 'email'},
                {display: 'Fax', name : 'fax'},
                {display: 'Permanent Address', name : 'pAddress'},
            ],
            sortname: "name",
            sortorder: "asc",
            usepager: true,
            title: 'Customers',
            useRp: true,
            rp: 15,
            showTableToggleBtn: false,
            width: 800,
            height: 400,
            singleSelect: true

        }
    );
});

function Customer_Grid_Actions(com,grid)
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
                            url: 'delete_customer.php',
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
                                    $('#customer_flex').flexReload();
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
        
        $('#sidepanel_customers_contents').empty().html(
            "<div class='sidepanel-contents'>" +
                "<h3 class='sidepanel-title'>Add Customer</h3>" +
                "<input class='sidepanel-input' type='text' placeholder='Name' maxlength='200' id='customer_name_add'/>" +
                "<input class='sidepanel-input' type='text' placeholder='Phone' maxlength='12' id='customer_phone_add'/>" +
                "<input class='sidepanel-input' type='email' placeholder='Email' maxlength='200' id='customer_email_add'/>" +
                "<input class='sidepanel-input' type='text' placeholder='Fax' maxlength='12' id='customer_fax_add'/>" +
                "<input class='sidepanel-input' type='text' placeholder='Permanent Address' maxlength='300' id='customer_pAddress_add'/>" +
                "<button class='sidepanel-button' onclick='submit_new_customer()'>Submit</button>" +
            "</div>"
        );
        $('#sidepanel_customers').removeClass('hide').addClass('show');

    }
    else if (com==='Edit')
    {
        // $('#add_product').click();


        if ($('.trSelected',grid).length>0) {

            var items = $('.trSelected',grid);
            var itemlist = items[0].id.substr(3);
            // alert(itemlist);

            $.ajax({
                url: 'get_edit_details_customer.php',
                type: 'POST',
                data: {
                    id: itemlist,
                },
                error: (e)=>{
                    console.log(e);
                },
                success: (response)=>{
                    if (response.success){
                        $('#sidepanel_customers_contents').empty().html(
                            "<div class='sidepanel-contents'>" +
                                "<h3 class='sidepanel-title'>Edit Customer</h3>" +
                                "<input type='hidden' placeholder='ID' maxlength='200' id='customer_id_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Name' maxlength='200' id='customer_name_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Phone' maxlength='12' id='customer_phone_edit'/>" +
                                "<input class='sidepanel-input' type='email' placeholder='Email' maxlength='200' id='customer_email_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Fax' maxlength='12' id='customer_fax_edit'/>" +
                                "<input class='sidepanel-input' type='text' placeholder='Permanent Address' maxlength='300' id='customer_pAddress_edit'/>" +
                                "<button class='sidepanel-button'  onclick='submit_edit_customer()'>Submit</button>" +
                            "</div>"
                        );
                        
                        // Set Data
                        $('#customer_id_edit').val(response.data.id);
                        $('#customer_name_edit').val(response.data.name);
                        $('#customer_phone_edit').val(response.data.phone);
                        $('#customer_email_edit').val(response.data.email);
                        $('#customer_fax_edit').val(response.data.fax);
                        $('#customer_pAddress_edit').val(response.data.pAddress);
                        $('#sidepanel_customers').removeClass('hide').addClass('show');
                    }
                }
            });

            
            
        } else {
            jAlert("Select one item", "E");
        }
    }
}




function submit_new_customer(){
    let name = $('#customer_name_add').val();
    let phone = $('#customer_phone_add').val();
    let email = $('#customer_email_add').val();
    let fax = $('#customer_fax_add').val();
    let pAddr = $('#customer_pAddress_add').val();

    $.ajax({
        url: 'add_new_customer.php',
        type: 'POST',
        data: {
            name: name,
            phone: phone,
            email: email,
            fax: fax,
            pAddr: pAddr
        },
        error: (e)=>{
            console.error(e);
        },
        success: (response)=>{
            if (response.success) {
                jAlert(response.message, "S");
                // Flex Reload
                $('#customer_flex').flexReload();
                $('#sidepanel_customers').removeClass('show').addClass('hide');
            } else {
                jAlert(response.message, "E");
            }
        }
    });


}

function submit_edit_customer(){
    let id = $('#customer_id_edit').val();
    let name = $('#customer_name_edit').val();
    let phone = $('#customer_phone_edit').val();
    let email = $('#customer_email_edit').val();
    let fax = $('#customer_fax_edit').val();
    let pAddr = $('#customer_pAddress_edit').val();

    $.ajax({
        url: 'edit_customer.php',
        type: 'POST',
        data: {
            id: id,
            name: name,
            phone: phone,
            email: email,
            fax: fax,
            pAddr: pAddr
        },
        error: (e)=>{
            console.error(e);
        },
        success: (response)=>{
            if (response.success) {
                jAlert(response.message, "S");
                // Flex Reload
                $('#customer_flex').flexReload();
                $('#sidepanel_customers').removeClass('show').addClass('hide');
            } else {
                jAlert(response.message, "E");
            }
        }
    });


}


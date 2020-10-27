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
                "<input class='sidepanel-input' type='text' placeholder='Email' maxlength='200' id='customer_email_add'/>" +
                "<input class='sidepanel-input' type='text' placeholder='Fax' maxlength='12' id='customer_fax_add'/>" +
                "<input class='sidepanel-input' type='text' placeholder='Permanent Address' maxlength='300' id='customer_pAddress_add'/>" +
                "<button class='sidepanel-button'>Submit</button>" +
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



            
            $('#sidepanel_customers_contents').empty().html(
                "<div class='sidepanel-contents'>" +
                    "<h3 class='sidepanel-title'>Edit Customer</h3>" +
                    "<input class='sidepanel-input' type='text' placeholder='Name' maxlength='200' id='customer_name_edit'/>" +
                    "<input class='sidepanel-input' type='text' placeholder='Phone' maxlength='12' id='customer_phone_edit'/>" +
                    "<input class='sidepanel-input' type='text' placeholder='Email' maxlength='200' id='customer_email_edit'/>" +
                    "<input class='sidepanel-input' type='text' placeholder='Fax' maxlength='12' id='customer_fax_edit'/>" +
                    "<input class='sidepanel-input' type='text' placeholder='Permanent Address' maxlength='300' id='customer_pAddress_edit'/>" +
                    "<button class='sidepanel-button'>Submit</button>" +
                "</div>"
            );
            $('#sidepanel_customers').removeClass('hide').addClass('show');
        } else {
            jAlert("Select one item", "E");
        }
    }
}




// insertItem: function(item) {
            //     return $.ajax({
            //         type: "POST",
            //         url: "./clients/",
            //         data: item
            //     });
            // },
            // updateItem: function(item) {
            //     return $.ajax({
            //         type: "PUT",
            //         url: "./clients/",
            //         data: item
            //     });
            // },
            // deleteItem: function(item) {
            //     return $.ajax({
            //         type: "DELETE",
            //         url: "./clients/",
            //         data: item
            //     });
            // }




            /*
            
            
            
            $.ajax({
      type
    });



    // let data = [
    //     {
    //       "id": "1",
    //       "name": "Petey Cruiser",
    //       "phone": "410763981007",
    //       "presentAddress": "405 Fulton Court Attleboro, MA 02703"
    //     },
    //     {
    //       "id": "2",
    //       "name": "Anna Sthesia",
    //       "phone": "10105525611",
    //       "presentAddress": "47 Glenridge St.\r\nHuntersville, NC 28078"
    //     },
    //     {
    //       "id": "3",
    //       "name": "Paul Molive",
    //       "phone": "6011377914",
    //       "presentAddress": "945 Mill Street\r\nParlin, NJ 08859"
    //     },
    //     {
    //       "id": "4",
    //       "name": "Anna Mull",
    //       "phone": "7901584026",
    //       "presentAddress": "613 East Clay Lane\r\nPalatine, IL 60067"
    //     },
    //     {
    //       "id": "5",
    //       "name": "Gail Forcewind",
    //       "phone": "1594941628",
    //       "presentAddress": "479 Thorne St.\r\nSaint Joseph, MI 49085"
    //     },
    //     {
    //       "id": "6",
    //       "name": "Paige Turner",
    //       "phone": "0148042499",
    //       "presentAddress": "128 Hillside St.\r\nBismarck, ND 58501"
    //     },
    //     {
    //       "id": "7",
    //       "name": "Walter Melon",
    //       "phone": "1171089059",
    //       "presentAddress": "7990 Lakewood Dr.\r\nPlainfield, NJ 07060"
    //     },
    //     {
    //       "id": "8",
    //       "name": "Nick R. Bocker",
    //       "phone": "5779877107",
    //       "presentAddress": "7555 NW. Gulf Drive\r\nJamaica, NY 11432"
    //     },
    //     {
    //       "id": "9",
    //       "name": "Barb Ackue",
    //       "phone": "9646946767",
    //       "presentAddress": "478 South Crescent Street\r\nBergenfield, NJ 07621"
    //     }
    //   ];
    $("#jsGrid").jsGrid({
        height: "100%",
        width: "100%",
        filtering: true,
        // inserting: true,
        // editing: true,
        // sorting: true,
        paging: true,
        autoload: true,
        pageSize: 10,
        pageButtonCount: 5,
        deleteConfirm: "Do you really want to delete client?",
        data: data,
        // controller: {
        //     loadData: function(filter) {
        //         return $.ajax({
        //             type: "GET",
        //             url: "./consultants.php",
        //             data: filter
        //         });
        //     },
            
        // },
        fields: [
            // { name: "ID", title: "ID", type: "text", width: 150},
            { name: "name", title: "Name", type: "text", width: 150 },
            { name: "phone", title: "Phone", type: "text", width: 50 }, // , filtering: false // If it is false then the GET won't be sent
            { name: "presentAddress", title: "Address", type: "text", width: 200 },
            // { name: "country_id", title: "Country", type: "select", width: 100, items: countries, valueField: "id", textField: "name" },
            // { name: "married", type: "checkbox", title: "Is Married", sorting: false, filtering: false },
            { type: "control" }
        ]
    });
            
            
            
            */
$(document).ready(function() {
    $("#consultant_flex").flexigrid
    ({
            url: 'consultants.php',
            dataType: 'json',
            colModel : [
                {display: 'ID', name : 'id', width : 80, sortable : true, align: 'center', hide: true},
                {display: 'Name', name : 'name', width : 250, sortable : true, align: 'left'},
                {display: 'Phone', name : 'phone', width : 150, sortable : true, align: 'left'},
                {display: 'Email', name : 'email', width : 250, sortable : true, align: 'left'},
                {display: 'Designation', name : 'designation', width : 100, sortable : true, align: 'left'},
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
});

function test(com,grid)
{
    if (com==='Enable/Disable Offer')
    {
        // confirm('Delete ' + $('.trSelected',grid).length + ' items?')

        if ($('.trSelected',grid).length>0) {
            jConfirm('<b> Confirm to perform action </b>', '', function(user_act) {
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
    else if (com==='Delete')
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
        


    }
    else if (com==='Edit')
    {
        // $('#add_product').click();


        if ($('.trSelected',grid).length>0) {

            var items = $('.trSelected',grid);
            var itemlist = items[0].id.substr(3);
            // alert(itemlist);



            

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
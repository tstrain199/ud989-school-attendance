var model = {
  "localStorage" : [
    {
      "name" : "Slappy the Frog",
      "daysMissed" : 0,
      "attendance" : []
    },
    {
      "name" : "Lilly the Lizard",
      "daysMissed" : 0,
      "attendance" : []
    },
    {
      "name" : "Palrus the Walrus",
      "daysMissed" : 0,
      "attendance" : []
    },
    {
      "name" : "Gregory the Goat",
      "daysMissed" : 0,
      "attendance" : []
    },
    {
      "name" : "Adam the Anaconda",
      "daysMissed" : 0,
      "attendance" : []
    }
  ],

  "classDays" : 12,


};

var octopus = {
  "returnLocalStorage" : function(){
    return(model.localStorage);
  },

  "returnClassDays" : function(){
    return(model.classDays);
  },

  "init" : function(){
    view.init();
  }

};

var view = {

  "init" : function(){
    // Put number of days in table row
    var nameColumn = $('tr');
    var a = octopus.returnClassDays();
    for (var i=1; i < a+1; i++){
      var th = "<th>"+i+"</th>";
      $(th).insertBefore('.missed-col');
    };

    //Create rows for each student
    var tBody = $("tbody");
    var b = octopus.returnLocalStorage();
    for (var h=0; h < b.length; h++){
      var td2 = '<td class="attend-col"><input type="checkbox"></td>';
      tBody.append("<tr class='student'>\
      <td class='name-col'>"+ b[h].name+"</td>");
      };
    for (var j=0; j < a; j++){
      $('.student').append('<td class="attend-col"><input type="checkbox"></td>');
    };
    $('.student').append('<td class="missed-col">0</td>');
  },

  "insertCols" : function(num, txt){
    console.log(num, txt);
    for (var j=0; j < num; j++){
      $('.student').append('<td class="attend-col"><input type="checkbox"></td>');
    };
  }
};

octopus.init();
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    // Todds Note: this finds the missing colum and then
    function countMissing() {
        $allMissed.each(function() {
            // T'N look up the student for this row
            var studentRow = $(this).parent('tr'),
                // T'N captures each day
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            //T'N checks each day and then sums
            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });
            //enters number of days missed in missed colum
            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
}());

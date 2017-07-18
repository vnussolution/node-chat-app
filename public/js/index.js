(function () {
    var socket = io();
    $('#join').on('click', (e) => {
        e.preventDefault();
        var name = $('#name').val().toLowerCase();
        var room = $('#myselect').val();
        var roomName = $('#roomName').val().toLowerCase().trim();
        // var message = $('ErrorMessage');

        room = roomName !== '' ? roomName : room;
        socket.emit('checkNameExist', { name: name }, (result) => {
            console.log('====', name, room, result);
            if (result) {
                $('#duplicateName').css({ 'display': 'block', 'color': 'red' });
                return;
            }
            if (!name || !room) {
                $('#emptyNameRoom').css({ 'display': 'block', 'color': 'red' });
                return;
            }
            if (!result) {
                window.location.href = `/chat.html?name=${name}&room=${room}`;
            }
            console.log('dup name');
            //  $('#errormessage').removeAttr('style');
        });
    });


    socket.emit('getRoomList', (rooms) => {

        if (rooms.length > 0) {
            var select = $('<select id="myselect"></select>');
            rooms.forEach((room) => {
                select.append($('<option></option>').attr('value', room).attr('name', room).text(room));
            });
            $('#dropdownlist').html(select);
        }

    });


})();
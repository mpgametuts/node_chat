$().ready(function()
{
    var socket = io.connect('/');

    socket.on('m', function (data) 
    {
        addOutput(data);
    });
    
    $('#btnsubmit').click(function()
    {
        sendMessage();
    });
    
    $('#txtinput').keypress(function(e)
    {
        //if we pressed enter
        if (e.keyCode == 13)
        {
            sendMessage();
        }
    });
    
    function sendMessage()
    {
        //get the message to send
        var txt = $('#txtinput').val();
        //clear the text box
        $('#txtinput').val(''); 
        
        //we don't want to send empty text!
        if (txt !== '')
        {
            addOutput(txt);
            socket.emit('m', txt);      
        }
    }
    
    function addOutput(msg)
    {
        $('#txtoutput').append("<p>"+msg+"</p>");
        
        //nice scroll effect
        $("#txtoutput").animate({ scrollTop: $("#txtoutput").prop("scrollHeight") }, 200);
    }
    
});
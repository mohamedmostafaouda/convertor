var currency;
$(document).ready(function () {
    $('.left-currency').hide();
});
$.ajax({url: "http://data.fixer.io/api/symbols?access_key=08febde34dbf7e0c26d18514696f62da", success: function(result){
    symbols = result;
    for(const property in result.symbols){
        $('select').append(`<option value=${property}>${result.symbols[property]}</option>`);
    }
}});

$.ajax({url: "http://data.fixer.io/api/latest?access_key=08febde34dbf7e0c26d18514696f62da&base=", success: function(result){
    currency = result;

}});

function getData(from,to){
    EURtoUSD = currency.rates[from];
    EURtoEGP = currency.rates[to];
    EURtoEGP *= (1/EURtoUSD); 
    EURtoUSD *= (1/EURtoUSD);
    return EURtoEGP.toFixed(2);;
}

$('#from').change(()=>{
    var from = $('#from').val();
    var to = $('#to').val();
    if (from === to){
        $('#from').val('');
        $('.from-main .text').text('Select Currency');
    }
})

$('#to').change(()=>{
    var from = $('#from').val();
    var to = $('#to').val();
    if (from === to){
        $('#to').val('');
        $('.to-main .text').text('Select Currency');
    }
})

$('#to, #from').change(()=>{
    var from = $('#from').val();
    var to = $('#to').val();
    if (from == '' || to== ''){
        $('.left-currency').fadeOut();
    }
    else{
        $('.left-currency').fadeOut(400, ()=>{
            $('#currency-name').text( $('#from').val()+' equals');
            $('.big-headline').text(getData(from,to) + " "+to);
            $('.left-currency').fadeIn();
            convertTo();
        });
    }
});

$('#from-am').keyup(()=>{
    if (from != '' || to != ''){
        convertTo();
    }
})

$('#to-am').keyup(()=>{
    if (from != '' || to != ''){
        convertFrom();
    }
})

function convertTo() {
    var from = $('#from').val();
    var to = $('#to').val();
    var ratio = getData(from,to);
    var fromAm = $('#from-am').val();
    if(fromAm.length == 0)
    $("#to-am").val(" ");
    else $("#to-am").val(ratio * fromAm);
}

function convertFrom() {
    var from = $('#from').val();
    var to = $('#to').val();
    var ratio = getData(from,to);
    var toAm = $('#to-am').val();
    if (toAm.length == 0)
    $('#from-am').val(" ");
    else $("#from-am").val(toAm / ratio);
}
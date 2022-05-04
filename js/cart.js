$('.plus-btn').click(function () {
    let quant = $(this).siblings('.quant').val();
    quant++;
    $(this).siblings('.quant').val(quant);
})
$('.minus-btn').click(function () {
    let quant = $(this).siblings('.quant').val();
    if (quant > 1) {
        quant--;
        $(this).siblings('.quant').val(quant);
    }
})
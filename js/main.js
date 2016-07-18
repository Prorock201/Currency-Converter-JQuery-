(function() {
	var bankUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3';
	var uah = {};
	$.get(bankUrl, getCurrency).fail(getError);
	$('#exchange').on('click', getExchange);
	$('#from').on('change', checkSelectChange);

	function getError() {
		alert('We got an error');
	}

	function getCurrency(data){
		var documentFragment = $(document.createDocumentFragment());
		documentFragment.append('<option value="UAH">UAH</option>');
		$.each(data, function(index,item){
			var currency = item.ccy;
			uah[currency] = {};
			uah[currency].buy = item.buy;
			uah[currency].sale = item.sale;
			documentFragment.append('<option value='+currency+'>'+currency+'</option>');
		});
		documentFragment.clone().appendTo('#from').find;
		documentFragment.appendTo('#to');
	}

	function getExchange(){
		var amount = $('#amount').val();
		var currencyFrom = $('#from option:selected').val();
		var currencyTo = $('#to option:selected').val();
		if (/^\d*.?\d*$/.test(amount)){
			if (currencyFrom === currencyTo) {
				$('#result').val(parseInt(amount).toFixed(2)).css('color', 'green');
			} else if (currencyFrom === 'UAH'){
				$('#result').val((amount/uah[currencyTo].sale).toFixed(2)).css('color', 'green');
			} else if (currencyTo === 'UAH'){
				$('#result').val((amount*uah[currencyFrom].buy).toFixed(2)).css('color', 'green');
			} else {
				$('#result').val((amount*uah[currencyFrom].buy/uah[currencyTo].sale).toFixed(2)).css('color', 'green');
			}
		} else {
			$('#result').val('ОШИБКА: не верный ввод данных').css('color', 'red');
		}
	}

	function checkSelectChange(event){
		$('#to option').css('display', 'block');
		currencyFrom = $(event.target).val();
		$('#to').find('option[value='+currencyFrom+']').css('display', 'none');
	}
})();
$ (window ).load( function()
{
	document.addEventListener( 'tizenhwkey', function( e )
	{
		if(e.keyName == "back")
			tizen.application.getCurrentApplication().exit();
    } );
	
	var itemHeight = 100,
		maxPosY = itemHeight,
		rowCnt = 3;
	
	$( '.contents > div' ).each( function()
	{
		var mc = new Hammer( this ),
			$self = $( this ),
			minPosY = ( $self.find( 'ul li' ).length - rowCnt + 1 ) * itemHeight * -1,
			$input = $( '#input-' + $self.attr( 'id' ) );

		$self.find( 'ul' ).css( 'transform', 'translate3d( 0, ' + maxPosY + 'px, 0 )' );
		$self.data( 'position-y', maxPosY );
		
		mc.get( 'pan' ).set( { direction: Hammer.DIRECTION_ALL } );
		mc.on( 'panup pandown', function( ev )
		{
			var lastPosY = Number( $self.data( 'position-y' ) ),
				posY = ev.deltaY + lastPosY,
				v = ev.velocityY;
			
			$self.find( 'ul' ).css( 'transform', 'translate3d( 0, ' + posY + 'px, 0 )' );
			$self.data( 'velocity-y', v );
		} );
		
		mc.on( 'panend', function( ev )
		{
			var lastPosY = Number( $self.data( 'position-y' ) ),
				posY = ev.deltaY + lastPosY,
				v = Math.abs( $self.data( 'velocity-y' ) );
			
			if( v > 4 )
				v = 4;
			
			if( v > 0 )
			{
				var d = ev.deltaY * v,
					posOffsetY = 0;
				
				while( Math.abs( d ) > 1 )
				{
					posOffsetY += d;
					d *= .5;
				}
				
				posY += posOffsetY;
			}
			
			var overflow = itemHeight - Math.abs( posY % 100 );
			
			if( Math.abs( posY % 100 ) < 50 ) posY -= posY % 100;
			else
			{
				if( posY < 0 ) posY -= overflow;
				else posY += overflow;
			}
			
			if( posY > maxPosY ) posY = maxPosY;
			else if( posY < minPosY ) posY = minPosY;
			
			var selectedItemIdx = Math.abs( ( posY - 100 ) / 100 );
			$input.val( $self.find( 'ul li' ).eq( selectedItemIdx ).html() );
			
			$self.find( 'ul' ).css( 'transform', 'translate3d( 0, ' + posY + 'px, 0 )' );
			$self.data( 'position-y', posY );
		} );
	} );
} );

function getTime()
{
	var $item = $( '.contents > div' ),
		result = '';
	
	for( var i = 0; i < $item.length; i++ )
	{
		var posY = Number( $item.eq( i ).data( 'position-y' ) ),
			selectedItemIdx = Math.abs( ( posY - 100 ) / 100 );
		
		result += $item.eq( i ).find( 'ul li' ).eq( selectedItemIdx ).html() + ' ';
	}
	
	console.log( 'selected time', result );
	
	return result;
}
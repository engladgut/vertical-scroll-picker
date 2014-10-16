$ (window ).load( function()
{
	document.addEventListener( 'tizenhwkey', function( e )
	{
		if(e.keyName == "back")
			tizen.application.getCurrentApplication().exit();
    } );
	
	
	$( '.contents' ).on( 'click', function()
	{
//		$( '#textbox' ).html( $( '#textbox' ).html() == 'Basic' ? 'Sample' : 'Basic' );				
	} );
	
	$( '.contents > div' ).each( function()
	{
		var mc = new Hammer( this ),
			$self = $( this );

		mc.get( 'pan' ).set( { direction: Hammer.DIRECTION_ALL } );
		mc.on( 'panup pandown', function( ev )
		{
			var lastPosY = Number( $self.data( 'position-y' ) ),
				posY = ev.deltaY + lastPosY,
				v = ev.velocityY;
			
//			console.log( $self.attr( 'id' ), 'lastPosY = ' + lastPosY );
//			console.log( $self.attr( 'id' ), 'posY = ' + posY );
			
			$self.find( 'ul' ).css( 'transform', 'translate3d( 0, ' + posY + 'px, 0 )' );
			$self.data( 'velocity-y', v );
		} );
		
		mc.on( 'panend', function( ev )
		{

			var lastPosY = Number( $self.data( 'position-y' ) ),
				posY = ev.deltaY + lastPosY,
				v = Math.abs( $self.data( 'velocity-y' ) );
			
//			console.log( 'v', v );
			
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
				
//				console.log( 'ev.deltaY', ev.deltaY );
//				console.log( 'posOffsetY', posOffsetY );
				
				posY += posOffsetY;
			}
			
			var itemHeight = 100,
				overflow = itemHeight - Math.abs( posY % 100 );
			
//			console.log( '====================================' );
//			console.log( 'posY before', posY );
//			console.log( 'posY % 100', ( posY % 100 ) );
//			console.log( 'overflow', overflow );
			
			if( Math.abs( posY % 100 ) < 50 ) posY -= posY % 100;
			else
			{
				if( posY < 0 ) posY -= overflow;
				else posY += overflow;
			}
			
//			console.log( 'posY after', posY );
			
			$self.find( 'ul' ).css( 'transform', 'translate3d( 0, ' + posY + 'px, 0 )' );
			$self.data( 'position-y', posY );
		} );
	} );
} );
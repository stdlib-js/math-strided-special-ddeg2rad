/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var tape = require( 'tape' );
var tryRequire = require( '@stdlib/utils-try-require' );
var deg2rad = require( '@stdlib/math-base-special-deg2rad' );
var uniform = require( '@stdlib/random-base-uniform' ).factory;
var Float64Array = require( '@stdlib/array-float64' );


// VARIABLES //

var ddeg2rad = tryRequire( resolve( __dirname, './../lib/ndarray.native.js' ) );
var opts = {
	'skip': ( ddeg2rad instanceof Error )
};
var rand = uniform( -180.0, 180.0 );


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof ddeg2rad, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function has an arity of 7', opts, function test( t ) {
	t.strictEqual( ddeg2rad.length, 7, 'arity of 7' );
	t.end();
});

tape( 'the function converts each element from degrees to radians', opts, function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = new Float64Array( 10 );
	y = new Float64Array( x.length );

	expected = new Float64Array( x.length );
	for ( i = 0; i < x.length; i++ ) {
		x[ i ] = rand();
		expected[ i ] = deg2rad( x[ i ] );
	}

	ddeg2rad( x.length, x, 1, 0, y, 1, 0 );

	t.deepEqual( y, expected, 'deep equal' );
	t.end();
});

tape( 'the function supports an `x` stride', opts, function test( t ) {
	var expected;
	var x;
	var y;
	var N;

	x = new Float64Array([
		rand(), // 0
		rand(),
		rand(), // 1
		rand(),
		rand()  // 2
	]);
	y = new Float64Array([
		0.0, // 0
		0.0, // 1
		0.0, // 2
		0.0,
		0.0
	]);
	N = 3;

	ddeg2rad( N, x, 2, 0, y, 1, 0 );

	expected = new Float64Array([
		deg2rad( x[ 0 ] ),
		deg2rad( x[ 2 ] ),
		deg2rad( x[ 4 ] ),
		0.0,
		0.0
	]);

	t.deepEqual( y, expected, 'deep equal' );
	t.end();
});

tape( 'the function supports an `x` offset', opts, function test( t ) {
	var expected;
	var x;
	var y;
	var N;

	x = new Float64Array([
		rand(),
		rand(),
		rand(), // 0
		rand(), // 1
		rand()  // 2
	]);
	y = new Float64Array([
		0.0, // 0
		0.0, // 1
		0.0, // 2
		0.0,
		0.0
	]);
	N = 3;

	ddeg2rad( N, x, 1, 2, y, 1, 0 );

	expected = new Float64Array([
		deg2rad( x[ 2 ] ),
		deg2rad( x[ 3 ] ),
		deg2rad( x[ 4 ] ),
		0.0,
		0.0
	]);

	t.deepEqual( y, expected, 'deep equal' );
	t.end();
});

tape( 'the function supports a `y` stride', opts, function test( t ) {
	var expected;
	var x;
	var y;
	var N;

	x = new Float64Array([
		rand(), // 0
		rand(), // 1
		rand(), // 2
		rand(),
		rand()
	]);
	y = new Float64Array([
		0.0, // 0
		0.0,
		0.0, // 1
		0.0,
		0.0  // 2
	]);
	N = 3;

	ddeg2rad( N, x, 1, 0, y, 2, 0 );

	expected = new Float64Array([
		deg2rad( x[ 0 ] ),
		0.0,
		deg2rad( x[ 1 ] ),
		0.0,
		deg2rad( x[ 2 ] )
	]);

	t.deepEqual( y, expected, 'deep equal' );
	t.end();
});

tape( 'the function supports a `y` offset', opts, function test( t ) {
	var expected;
	var x;
	var y;
	var N;

	x = new Float64Array([
		rand(), // 0
		rand(), // 1
		rand(), // 2
		rand(),
		rand()
	]);
	y = new Float64Array([
		0.0,
		0.0,
		0.0, // 0
		0.0, // 1
		0.0  // 2
	]);
	N = 3;

	ddeg2rad( N, x, 1, 0, y, 1, 2 );

	expected = new Float64Array([
		0.0,
		0.0,
		deg2rad( x[ 0 ] ),
		deg2rad( x[ 1 ] ),
		deg2rad( x[ 2 ] )
	]);

	t.deepEqual( y, expected, 'deep equal' );
	t.end();
});

tape( 'the function returns a reference to the destination array', opts, function test( t ) {
	var out;
	var x;
	var y;

	x = new Float64Array( 5 );
	y = new Float64Array( x.length );

	out = ddeg2rad( x.length, x, 1, 0, y, 1, 0 );

	t.strictEqual( out, y, 'same reference' );
	t.end();
});

tape( 'if provided an `N` parameter less than or equal to `0`, the function returns `y` unchanged', opts, function test( t ) {
	var expected;
	var x;
	var y;

	x = new Float64Array( [ rand(), rand(), rand(), rand(), rand() ] );
	y = new Float64Array( [ 0.0, 0.0, 0.0, 0.0, 0.0 ] );

	expected = new Float64Array( [ 0.0, 0.0, 0.0, 0.0, 0.0 ] );

	ddeg2rad( -1, x, 1, 0, y, 1, 0 );
	t.deepEqual( y, expected, 'returns `y` unchanged' );

	ddeg2rad( 0, x, 1, 0, y, 1, 0 );
	t.deepEqual( y, expected, 'returns `y` unchanged' );

	t.end();
});

tape( 'the function supports negative strides', opts, function test( t ) {
	var expected;
	var x;
	var y;
	var N;

	x = new Float64Array([
		rand(), // 2
		rand(),
		rand(), // 1
		rand(),
		rand()  // 0
	]);
	y = new Float64Array([
		0.0,
		0.0, // 2
		0.0, // 1
		0.0, // 0
		0.0
	]);
	N = 3;

	ddeg2rad( N, x, -2, x.length-1, y, -1, y.length-2 );

	expected = new Float64Array([
		0.0,
		deg2rad( x[ 0 ] ),
		deg2rad( x[ 2 ] ),
		deg2rad( x[ 4 ] ),
		0.0
	]);

	t.deepEqual( y, expected, 'deep equal' );
	t.end();
});

tape( 'the function supports complex access patterns', opts, function test( t ) {
	var expected;
	var x;
	var y;
	var N;

	x = new Float64Array([
		rand(),
		rand(), // 0
		rand(),
		rand(), // 1
		rand(),
		rand()  // 2
	]);
	y = new Float64Array([
		0.0,
		0.0,
		0.0,
		0.0, // 2
		0.0, // 1
		0.0  // 0
	]);
	N = 3;

	ddeg2rad( N, x, 2, 1, y, -1, y.length-1 );

	expected = new Float64Array([
		0.0,
		0.0,
		0.0,
		deg2rad( x[ 5 ] ),
		deg2rad( x[ 3 ] ),
		deg2rad( x[ 1 ] )
	]);

	t.deepEqual( y, expected, 'deep equal' );
	t.end();
});

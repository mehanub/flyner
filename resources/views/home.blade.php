 @extends('layouts.app')

@section('content')   
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif
                    <div id="app">
                          
                     <example></example>
                    </div>
   
 @endsection 

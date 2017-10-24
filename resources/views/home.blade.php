 @extends('layouts.app')

@section('content')   
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif
                     
                          <v-app>
                     <app></app>
                  		</v-app>
                   
   
 @endsection 

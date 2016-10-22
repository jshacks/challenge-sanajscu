<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>JsHacks</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        {{-- {{ Html::style(elixir('main.css')) }} --}}

        <script type="text/javascript">
            JsHacks = {
                token_ : '{{ csrf_token() }}',
            }
        </script>

    </head>
    <body>
        <div id="app">
            <header-top></header-top>
        </div>
        {{ Html::script(elixir('commons.js')) }}
        {{ Html::script(elixir('main.js')) }}
    </body>
</html>

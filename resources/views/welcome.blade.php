<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>JsHacks</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />

        {{ Html::style(elixir('main.css')) }}

        <script type="text/javascript">
            JsHacks = {
                token_ : '{{ csrf_token() }}',
            }
        </script>

    </head>
    <body>
        <div id="app">
            <main-header></main-header>
            <section class="section">
                <div class="columns main-container">
                    <main-sidebar></main-sidebar>
                    <main-content><router-view></router-view></main-content>
                </div>
            </section>
            <main-footer></main-footer>
        </div>
        {{ Html::script(elixir('commons.js')) }}
        {{ Html::script(elixir('main.js')) }}

        <script src="https://unpkg.com/leaflet@1.0.1/dist/leaflet.js"></script>
    </body>
</html>

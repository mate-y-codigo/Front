export function loginHtml() {
    return `
        <div class="flex h-screen">
            <div id="login-info" class="flex-1">
                <div class="flex flex-col h-screen">
                    <div class="login-info-logo">
                        <div class="flex flex-row items-center justify-center">
                            <span><img src="/img/logo-sinfondo.png"></span>
                            <span>
                                <h1 class="ubuntu-bold">FitCode</h1>
                            </span>
                        </div>
                    </div>
                    <div class="login-info-msg">
                        <div class="login-info-msg-1">
                            Sistema de gestión profesional para gimnasios o entrenadores personales
                        </div>
                        <div class="login-info-msg-2">
                            Administra usuarios, planes de entrenamiento, sesiones y pagos en una sola plataforma.
                        </div>
                    </div>
                    <div class="login-info-footer">
                        <p>© 2025 FitCode. Sistema de gestión profesional para gimnasios o entrenadores personales.</p>
                    </div>
                </div>
            </div>
            <div class="flex-1">
                <div class="flex flex-col h-screen">
                    <div class="flex-1 flex items-center justify-center p-8 bg-background">
                        <div class="login-card">
                            <div class="login-card-content">
                                <div class="login-card-content-title flex flex-col">
                                    <h3>
                                        Iniciar Sesión
                                    </h3>
                                    <p class="text-sm text-muted-foreground text-center">
                                        Ingresa tus credenciales para acceder al sistema
                                    </p>
                                </div>
                                <div class="login-card-content-form">
                                    <div class="space-y-6">
                                        <div class="email space-y-2">
                                            <label for="email">Email</label>
                                            <input type="email" id="email" placeholder="tu@email.com" required="" value="">
                                        </div>
                                        <div class="pass space-y-2">
                                            <label for="password">Contraseña</label>
                                            <input type="password" id="password" placeholder="••••••••" required="" value="">
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <label class="remember-me flex items-center">
                                                <input type="checkbox">
                                                <span class="text-muted-foreground">Recordarme</span>
                                            </label>
                                            <a href="#">¿Olvidaste tu contraseña?</a>
                                        </div>
                                        <button id="login-button" class="button inline-flex items-center justify-center">Ingresar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}
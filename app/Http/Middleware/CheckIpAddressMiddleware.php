<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckIpAddressMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (app()->isProduction()) {
            $allowed_ips = [
                '192.168.50.210',
            ];

            if (! in_array($request->ip(), $allowed_ips)) {
                return response()->json([
                    'message' => 'Unauthorized',
                    'ip_address' => $request->ip(),
                ], 403);
            }

            return $next($request);
        }

        return $next($request);
    }
}
